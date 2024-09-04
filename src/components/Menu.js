import {
  IconMicrophone,
  IconMicrophoneOff,
  IconScreenShare,
  IconVideo,
  IconVideoOff,
} from "@tabler/icons";
import { useVideoDispatch, useVideoState } from "../contexts/video-context";
import { MENU_HEIGHT } from "../utils/config";

export default function Menu() {
  const dispatch = useVideoDispatch();
  const { isVideo, isAudio, isScreen } = useVideoState();
  const menuClass = "flex flex-col items-center cursor-pointer";
  const activeClass = "text-sky-400";
  const menuScreenClass = isScreen ? `${menuClass} ${activeClass}` : menuClass;
  return (
    <div
      className="flex justify-center items-center gap-4 text-sm text-gray-400"
      style={{ height: MENU_HEIGHT }}
    >
      <div className={menuClass} onClick={() => dispatch({ type: "video" })}>
        <div>Video</div>
        {isVideo ? (
          <IconVideo fill="currentColor" size={36} />
        ) : (
          <IconVideoOff fill="currentColor" size={36} />
        )}
      </div>
      <div className={menuClass} onClick={() => dispatch({ type: "audio" })}>
        <div>Audio</div>
        {isAudio ? (
          <IconMicrophone fill="currentColor" size={36} />
        ) : (
          <IconMicrophoneOff fill="currentColor" size={36} />
        )}
      </div>
      <div
        className={menuScreenClass}
        onClick={() => dispatch({ type: "screen" })}
      >
        <div>Screen Share</div>
        {isScreen ? (
          <IconScreenShare fill="currentColor" size={42} />
        ) : (
          <IconScreenShare fill="currentColor" size={36} />
        )}
      </div>
    </div>
  );
}
