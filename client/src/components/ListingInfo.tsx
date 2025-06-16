import React from 'react'

const ListingInfo:React.FC = () => {
  return (
    <div className='w-full h-screen flex flex-row justify-center items-center px-10 box-border gap-[5%]'>
      <div className='w-[40%] h-[80%]'>
        <img src="https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/232826678.webp?k=7c3ffae46e5a9988fecc5e9c662e5445710e8eff5c18d1a1d186a1a46d24ae5e&o=" alt="name" 
        className='w-full h-full'
        />
      </div>
      <div className='w-[40%] h-[80%] flex flex-col items-start justify-start gap-5'>
        <div className='w-full flex flex-col items-start justify-start text-xl'>
          <span>name</span>
          <span>location</span>
        </div>
        <span>desc</span>
        <div className='w-full flex felx-row justify-start items-center gap-5'>
          <span>price</span>
          <span>rating</span>
        </div>
        <div className='w-full h-[15%] flex justify-start items-center border-t'>
          <button>Book</button>
        </div>
      </div>
    </div>
  )
}

export default ListingInfo