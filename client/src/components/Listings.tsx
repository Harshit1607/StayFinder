import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { fetchListings } from '../store/listingsSlice'

const Listings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { listings, loading, error } = useAppSelector((state) => state.listings);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchListings())
  }, [dispatch])


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="w-[90%] flex flex-wrap gap-y-5 justify-between">
      {listings.map((item) => (
        <div
          key={item.id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-[22%] h-[300px] flex flex-col rounded-t"
          onClick={() => navigate(`/listing/${item.id}`)}
        >
          <img
            src={item.image_url || 'https://via.placeholder.com/150'}
            alt={item.title}
            className="w-full h-[70%] rounded-t bg-white border-1 border-b-0 mb-2"
          />

          <span className="font-bold">{item.title}</span>
          <span>{item.location}</span>
          <div className="w-full h-[10%] flex flex-row justify-between border-t box-border px-1 mt-2">
            <span>{item.price_per_night}</span>
            <span>5</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Listings
