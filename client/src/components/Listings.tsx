import React from 'react'
import listings from '../data/listings'

const Listings:React.FC = () => {
  return (
    
    <div className="w-[90%] md:w-[80%] flex flex-wrap gap-4 ">
      {listings.map((item, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-[300px] flex flex-col rounded-t"
        >
          <img src="" alt="" className='w-full h-[70%] rounded-t-xl'/>
          <span className='font-bold'>
          {item.title}
          </span>
          <span>
          {item.location}
          </span>
          <div className='w-full h-[10%] flex flex-row justify-between border-t box-border p-x-1'>
            <span>{item.price_per_night}</span>
            <span>5</span>
          </div>
        </div>
      ))} 
    </div>
    
  )
}

export default Listings