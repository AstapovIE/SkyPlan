'use client'
import Image from 'next/image'
import React, { useRef }  from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import "@fontsource/monoton"
gsap.registerPlugin(ScrollTrigger)

export const AnimationOne = () => {

    const textRef = useRef(null)
    const containerRef = useRef(null)
    const rainRef = useRef(null)
    const subtextRef = useRef(null)

    useGSAP(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger:containerRef.current,
                start: '53% 50%',
                markers:false,
                scrub:true
            }
        })
        tl.to(textRef.current, {
            y:-200,
            scale: 1.2
        })
        .to(rainRef.current, {
            scale: 0.9,
        })
        .to(containerRef.current, {
            y:-300,
        })
        .to(subtextRef.current,{
            scale:0.2,
        })
    })
  return (
    <div ref = {containerRef} className='h-screen bg-[#110808] flex flex-col items-center justify-center relative'>
        <Image ref ={rainRef} src={'/sunset.jpg'} alt='rain' width ='2100' height ="1000"/>
        <h1 ref = {textRef} className='monoton-regular uppercase text-9xl text-[#c43c26] absolute top-[10rem] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
            Sky Plan
        </h1>
        <h2 ref = {subtextRef}className='rubik-death text-4xl text-white absolute top-[18rem]  tracking-tight'>
        Your Ideas. Our Solutions.
        </h2>
    </div>
  )
}
