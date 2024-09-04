import { Children, cloneElement, useEffect } from 'react'
import PropTypes from 'prop-types'
import CustomOTSubscriberContext from '../contexts/custom-otsubscriber-context'
import {
  useCalcVideoSize,
  useSubscriberNumberUpdate,
} from '../contexts/subscriber-number-context'

export default function CustomOTStreams(props, context) {
  const session = props.session || context.session || null
  const streams = props.streams || context.streams || null

  const subscriberNumberUpdate = useSubscriberNumberUpdate()
  useEffect(() => {
    subscriberNumberUpdate(streams?.length ?? 0)
  }, [streams?.length, subscriberNumberUpdate])

  const [videoWidth, videoHeight] = useCalcVideoSize()

  if (!session) {
    return <div />
  }

  const child = Children.only(props.children)

  const childrenWithContextWrapper = Array.isArray(streams)
    ? streams.map((stream) =>
        child ? (
          <CustomOTSubscriberContext
            stream={stream}
            videoWidth={videoWidth}
            videoHeight={videoHeight}
            key={stream.id}
          >
            {cloneElement(child)}
          </CustomOTSubscriberContext>
        ) : (
          child
        )
      )
    : null

  return childrenWithContextWrapper
}

CustomOTStreams.propTypes = {
  children: PropTypes.element.isRequired,
  session: PropTypes.shape({
    publish: PropTypes.func,
    subscribe: PropTypes.func,
  }),
  streams: PropTypes.arrayOf(PropTypes.object),
}

CustomOTStreams.defaultProps = {
  session: null,
  streams: null,
}

CustomOTStreams.contextTypes = {
  session: PropTypes.shape({
    publish: PropTypes.func,
    subscribe: PropTypes.func,
  }),
  streams: PropTypes.arrayOf(PropTypes.object),
}
