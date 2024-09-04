import { useState } from 'react'
import CustomOTSubscriber from './CustomOTSubscriber'
import HeadlessDialog from './HeadlessDialog'

function Subscriber() {
  const [error, setError] = useState()

  const handleError = (err) => {
    setError('Failed to connect!')
    console.error(err)
  }

  return (
    <>
      <CustomOTSubscriber
        properties={{
          subscribeToAudio: true,
          subscribeToVideo: true,
        }}
        onError={handleError}
      />
      {error && <HeadlessDialog msg={error} />}
    </>
  )
}

export default Subscriber
