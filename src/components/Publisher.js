import { useState } from 'react'
import CustomOTPublisher from './CustomOTPublisher'
import HeadlessDialog from './HeadlessDialog'
import { useCalcVideoSize } from '../contexts/subscriber-number-context'
import { useVideoState } from '../contexts/video-context'

function Publisher() {
  const [error, setError] = useState()
  const { isVideo, isAudio, isScreen } = useVideoState()
  const [videoWidth, videoHeight] = useCalcVideoSize()

  const handleError = (err) => {
    setError('Failed to connect!')
    console.error(err)
  }

  return (
    <>
      <CustomOTPublisher
        properties={{
          publishAudio: isAudio,
          publishVideo: isVideo,
          videoSource: isScreen === true ? 'screen' : undefined,
        }}
        videoWidth={videoWidth}
        videoHeight={videoHeight}
        onError={handleError}
      />
      {error && <HeadlessDialog msg={error} />}
    </>
  )
}
export default Publisher
