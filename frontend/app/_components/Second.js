'use client'
import Image from 'next/image'
import React, { useRef }  from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Second = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

useGSAP(() => {
  const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "500 top",
          scrub: true,
          scrub: 3,
          pin: true,
          markers:false,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="scroll-section-outer">
      <div ref={triggerRef} className='bg-[#110808]'>
        <div ref={sectionRef} className="scroll-section-inner bg-[#110808] h-screen">
          <div className="scroll-section text-white monoton-regular uppercase text-8xl">
            <h3 className='text-white monoton-regular uppercase text-9xl top-[20rem]'>Reliable</h3>
            <h3 className='text-[#110808] monoton-regular uppercase text-5xl'>Hello</h3>
            <Image src={'/storm.jpg'} alt='rain' width ='1000' height ="900"/>
            <h4 className='text-white absolute bottom-[30rem] rubik-death text-6xl left-[80rem]'>New mechanics of algorithms provide new level of accuracy</h4>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Second
