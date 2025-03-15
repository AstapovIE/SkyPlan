import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Modul = ({handleShowModal}) => {
  return (
    <div className='h-screen bg-[#110808] flex flex-col items-center justify-center relative'>
        <h2 className='rubik-death  text-9xl text-white absolute top-[10rem] tracking-wide'>All you need is just </h2>
        <Link href="/login">
        <button
        className=' bg-[#110808] py-40 px-80 justify-center flex items-center rounded-md monoton-regular text-8xl text-[#c43c26]'>
            ONE CLICK
        </button>
        </Link>
        <h4 className='monoton-regular uppercase text-5xl text-[#c43c26] absolute bottom-[2rem] right-[2rem]'>SkyPlan</h4>
        <h5 className='rubik-death text-1xl text-white absolute bottom-[0rem] right-[4rem] tracking-tight'>Your Ideas.Our Solutions</h5>
        <h5 className='rubik-death text-1xl text-white absolute bottom-[0rem] left-[1rem] tracking-tight'>S.I.M.S</h5>
    </div>
  )
}

export default Modul