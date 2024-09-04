import { createContext, useContext, useState } from 'react'
import { MENU_HEIGHT } from '../utils/config'

const SubscriberNumberStateContext = createContext(0)
const SubscriberNumberUpdateContext = createContext()

function SubscriberNumberProvider({ children }) {
  const [subscriberNumber, setSubscriberNumber] = useState(0)
  return (
    <SubscriberNumberStateContext.Provider value={subscriberNumber}>
      <SubscriberNumberUpdateContext.Provider value={setSubscriberNumber}>
        {children}
      </SubscriberNumberUpdateContext.Provider>
    </SubscriberNumberStateContext.Provider>
  )
}

function useSubscriberNumberState() {
  const context = useContext(SubscriberNumberStateContext)
  if (context === undefined) {
    throw new Error(
      'useSubscriberNumberState must be used within a SubscriberNumberProvider'
    )
  }
  return context
}

function getWindowDimensions() {
  const { innerWidth, innerHeight } = window
  return [innerWidth, innerHeight]
}

function menuHeightSpace(
  windowHeight,
  videoHeight,
  rowNumber,
  menu_height = MENU_HEIGHT // px
) {
  const windowSpace = windowHeight - videoHeight * rowNumber
  return windowSpace > menu_height
    ? 0
    : ((menu_height - windowSpace) / rowNumber / windowHeight) * 100
}

function adjustVideoHeight(widthViewport, videoNumber, maxRatio = 1.5) {
  const [windowWidth, windowHeight] = getWindowDimensions()
  const rowNumber = Math.round(Math.sqrt(videoNumber))
  const heightViewport = 100 / rowNumber
  const width = (windowWidth * widthViewport) / 100
  const tmpHeight = (windowHeight * heightViewport) / 100
  const maxHeight = width * maxRatio
  if (maxHeight > tmpHeight) {
    return heightViewport - menuHeightSpace(windowHeight, tmpHeight, rowNumber)
  }
  // tmpHeight * X = maxHeight
  // X = maxHeight / tmpHeight
  return (
    heightViewport * (maxHeight / tmpHeight) -
    menuHeightSpace(windowHeight, maxHeight, rowNumber)
  )
}

function useCalcVideoSize() {
  const subscriberNumber = useSubscriberNumberState()
  const videoNumber = subscriberNumber + 1
  const columnNumber = Math.ceil(Math.sqrt(videoNumber))
  const videoWidthViewport = 100 / columnNumber
  const videoHeightViewport = adjustVideoHeight(videoWidthViewport, videoNumber)

  return [`${videoWidthViewport}vw`, `${videoHeightViewport}vh`]
}

function useSubscriberNumberUpdate() {
  const context = useContext(SubscriberNumberUpdateContext)
  if (context === undefined) {
    throw new Error(
      'useSubscriberNumberUpdate must be used within a SubscriberNumberProvider'
    )
  }
  return context
}

export { SubscriberNumberProvider, useCalcVideoSize, useSubscriberNumberUpdate }
