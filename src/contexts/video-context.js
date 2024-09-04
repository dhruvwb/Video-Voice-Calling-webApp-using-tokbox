import { createContext, useContext, useReducer } from 'react'

const VideoStateContext = createContext()
const VideoDispatchContext = createContext()

function videoReducer(state, action) {
  switch (action.type) {
    case 'video':
      return { ...state, isVideo: !state.isVideo, isScreen: false }
    case 'audio':
      return { ...state, isAudio: !state.isAudio }
    case 'screen':
      return { ...state, isVideo: true, isScreen: !state.isScreen }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function VideoProvider({ children }) {
  const [state, dispatch] = useReducer(videoReducer, {
    isVideo: true,
    isAudio: true,
    isScreen: false,
  })
  return (
    <VideoStateContext.Provider value={state}>
      <VideoDispatchContext.Provider value={dispatch}>
        {children}
      </VideoDispatchContext.Provider>
    </VideoStateContext.Provider>
  )
}

function useVideoState() {
  const context = useContext(VideoStateContext)
  if (context === undefined) {
    throw new Error('useVideoState must be used within a VideoProvider')
  }
  return context
}

function useVideoDispatch() {
  const context = useContext(VideoDispatchContext)
  if (context === undefined) {
    throw new Error('useVideoDispatch must be used within a VideoProvider')
  }
  return context
}

export { VideoProvider, useVideoState, useVideoDispatch }
