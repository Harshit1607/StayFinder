import React from 'react'

const Navbar:React.FC = () => {
  return (
    <div
    className='w-screen h-[80px] box-border px-5 flex flex-row justify-between items-center'
    >
      <span>StayFinder</span>
      <div className='flex flex-row gap-5'>
        <span>Become a host</span>
        <span>U</span>
      </div>
    </div>
  )
}

export default Navbar