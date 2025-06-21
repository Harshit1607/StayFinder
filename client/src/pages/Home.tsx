import React from 'react'
import Listings from '../components/Listings'
import Navbar from '../components/Navbar'

const Home:React.FC = () => {
  return (
    <div className='max-w-screen flex flex-col items-center justify-start pt-[150px]'>
      <Navbar />
      <Listings />
    </div>
  )
}

export default Home