'use client'
import React, {ReactNode} from 'react'
import {ReactLenis} from '@studio-freight/react-lenis'
export const SmoothScroll = ({children}) => {
  return (
    <ReactLenis root options = {{lerp: 0.05}}>
        {children}
    </ReactLenis>
  )
}
