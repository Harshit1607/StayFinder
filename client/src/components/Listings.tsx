import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchListings } from '../store/listingsSlice';
import { Star, BedDouble } from 'lucide-react';

const Listings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { listings, loading, error } = useAppSelector((state) => state.listings);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] py-10 px-5">
      <div className="w-[90%] mx-auto flex flex-wrap gap-y-10 gap-x-5 justify-center">
        {listings.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-[48%] md:w-[31%] lg:w-[22%] bg-[#1a1a1a] rounded overflow-hidden shadow-md cursor-pointer transition-transform hover:-translate-y-1 border border-[#333]"
            onClick={() => navigate(`/listing/${item.id}`)}
          >
            {/* Image Section */}
            <div className="relative w-full h-[180px]">
              <img
                src={item.image_url?.[0] || 'https://via.placeholder.com/300x200'}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-3 py-1 rounded uppercase font-semibold tracking-wide">
                Best Deal
              </div>
            </div>

            {/* Info Section */}
            <div className="p-4 flex flex-col gap-2">
              <span className="text-xs text-yellow-600 uppercase tracking-widest font-medium">Luxury Room</span>
              <h3 className="font-semibold text-lg text-white">{item.title}</h3>
              <span className="text-sm text-gray-400">{item.location}</span>

              {/* Price and Rating */}
              <div className="flex items-center justify-between mt-2 text-sm text-gray-300">
                <span className="font-bold text-yellow-500">₹{item.price_per_night}/night</span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span>{item.average_rating || '4.9'}</span>
                </div>
              </div>

              {/* Icon Row */}
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <BedDouble size={16} className="text-gray-400" />
                <span>2 King Beds</span> {/* Replace with real data if available */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
