import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import BookingSummary from './BookingSummary';
import ImageCarousel from './ImageCarousel';

interface Props {
  listing: {
    id: number;
    title: string;
    description: string;
    location: string;
    price_per_night: string;
    image_url?: string[];
    average_rating?: string;
  };
}

const ListingInfo: React.FC<Props> = ({ listing }) => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const handleBookClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowCalendar(true);
    }
  };

  const handleCloseCalendar = (inDate: Date, outDate: Date) => {
    setCheckIn(inDate);
    setCheckOut(outDate);
    setShowCalendar(false);
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  return (
    <div className="w-full h-screen bg-[#0f0f0f] text-white flex flex-row justify-center items-center px-10 box-border gap-[5%] relative font-sans pt-[100px]">
      {showCalendar && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-20 flex justify-center items-center">
          <Calendar
            onClose={(inDate, outDate) => handleCloseCalendar(inDate, outDate)}
          />
        </div>
      )}

      {showSummary && checkIn && checkOut && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[100] flex justify-center items-center border-4 border-green-500">
          <BookingSummary
            listing={listing}
            checkIn={checkIn}
            checkOut={checkOut}
            onClose={handleCloseSummary}
          />
        </div>
      )}

      {/* Left - Image Section with layers */}
      <div className="w-[40%] h-[80%] relative">
        <div className="absolute top-2 -left-5 w-full h-[90%] bg-yellow-800 rounded-md z-5" />
        <div className="absolute bottom-2 -right-5 w-full h-[90%] bg-white rounded-md z-5" />
        <div className="w-full h-full rounded-md overflow-hidden shadow-lg relative z-10">
          {listing?.image_url && listing.image_url.length > 0 ? (
            <ImageCarousel images={listing.image_url} />
          ) : (
            <img
              src="https://via.placeholder.com/500"
              alt="No Image"
              className="w-full h-full object-cover rounded"
            />
          )}
        </div>
      </div>

      {/* Right - Text Content */}
      <div className="w-[40%] h-[80%] px-8 rounded flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <span className="text-xs text-yellow-700 uppercase tracking-widest font-medium">
            Luxury Hotel and Resort
          </span>
          <h2 className="text-3xl font-semibold text-white leading-tight">
            {listing.title}, {listing.location}
          </h2>
          <span className="text-gray-400 mt-2 text-sm leading-relaxed">
            {listing.description}
          </span>
        </div>

        <div className="flex flex-row gap-10 mt-6">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-yellow-600">250+</span>
            <span className="text-sm text-gray-400">Luxury Rooms</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-yellow-600">
              {listing.average_rating || '4.9'}
            </span>
            <span className="text-sm text-gray-400">Customer Rating</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="bg-yellow-700 text-white px-6 py-2 rounded hover:bg-yellow-800 transition-all"
            onClick={handleBookClick}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
