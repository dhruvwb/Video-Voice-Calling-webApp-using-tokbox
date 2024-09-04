import React, { useState, useEffect, useRef, createContext } from "react";
import { OTSession } from "opentok-react";
import CustomOTStreams from "./components/CustomOTStreams";
import HeadlessDialog from "./components/HeadlessDialog";
import Menu from "./components/Menu";
import Publisher from "./components/Publisher";
import Subscriber from "./components/Subscriber";
import VideosWrapper from "./components/VideosWrapper";
import { SubscriberNumberProvider } from "./contexts/subscriber-number-context";
import { VideoProvider } from "./contexts/video-context";
import { preloadScript } from "opentok-react";

const OTSessionContext = createContext();

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const OTSessionWrapper = ({ children, ...props }) => {
  const [session, setSession] = useState(null);

  const sessionConnected = () => {
    setSession(true);
  };

  const sessionDisconnected = () => {
    setSession(false);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <OTSession
      {...props}
      eventHandlers={{ sessionConnected, sessionDisconnected }}
      onError={handleError}
    >
      <OTSessionContext.Provider value={{ session }}>
        {children}
      </OTSessionContext.Provider>
    </OTSession>
  );
};

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState();
  const savedIsConnected = useRef(isConnected);

  const sessionConnected = () => setIsConnected(true);
  const sessionDisconnected = () => setIsConnected(false);
  const handleError = (err) => {
    setError("Failed to connect!");
    console.error(err);
  };

  useEffect(() => {
    if (savedIsConnected.current !== isConnected) {
      savedIsConnected.current = isConnected;
      setIsConnected(isConnected);
      console.log("isConnected:", isConnected);
    }
  }, [isConnected, setIsConnected]);
  console.log("Api" + process.env.REACT_APP_TOKBOX_API_KEY);
  return (
    <ErrorBoundary>
      <OTSessionWrapper
        apiKey={process.env.REACT_APP_TOKBOX_API_KEY}
        sessionId={process.env.REACT_APP_TOKBOX_SESSION_ID}
        token={process.env.REACT_APP_TOKBOX_TOKEN}
      >
        <VideoProvider>
          <SubscriberNumberProvider>
            <VideosWrapper>
              {error && <HeadlessDialog msg={error} />}
              <Publisher />
              <CustomOTStreams>
                <Subscriber />
              </CustomOTStreams>
            </VideosWrapper>
          </SubscriberNumberProvider>
          <Menu />
        </VideoProvider>
      </OTSessionWrapper>
    </ErrorBoundary>
  );
}

export default preloadScript(App);
