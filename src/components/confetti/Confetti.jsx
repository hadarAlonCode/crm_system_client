import React from 'react'
import Confetti from 'react-confetti'
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
  } from '@react-hook/window-size'
  
export default () => {
  const { width, height } = useWindowSize()
  return (
   
    <Confetti
      width={width}
      height={height}
    />
   
  )
}