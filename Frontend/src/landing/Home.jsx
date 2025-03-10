import React from 'react'
import Navbar from '@/components/components/Navbar'
import Header from '@/components/components/Header'

const HomeLand = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-[url("/bg_img")] bg-cover bg-center'>
      <Navbar/>
      <Header/>
    </div>
  )
}

export default HomeLand