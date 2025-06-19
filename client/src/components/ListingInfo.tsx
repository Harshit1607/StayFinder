import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import BookingSummary from './BookingSummary';

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
  console.log('Received dates from calendar:', inDate, outDate); // 👈 Add this
  setCheckIn(inDate);
  setCheckOut(outDate);
  setShowCalendar(false);
  setShowSummary(true);
};


  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  return (
    <div className='w-full h-screen flex flex-row justify-center items-center px-10 box-border gap-[5%] relative'>
      {showCalendar && (
        <div className='absolute top-0 left-0 w-full h-full bg-white z-20 flex justify-center items-center'>
          <Calendar
            onClose={(inDate, outDate) => handleCloseCalendar(inDate, outDate)}
          />
        </div>
      )}

      {showSummary && checkIn && checkOut && (
  <div className='absolute top-0 left-0 w-full h-full bg-white z-[100] flex justify-center items-center border-4 border-green-500'>
    <BookingSummary
      listing={listing}
      checkIn={checkIn}
      checkOut={checkOut}
      onClose={handleCloseSummary}
    />
  </div>
)}


      <div className='w-[40%] h-[80%]'>
        {listing?.image_url ? (
          <img
            src={listing.image_url[0] || 'https://via.placeholder.com/500'}
            alt={listing.title}
            className='w-full h-full object-cover rounded'
          />
        ) : null}
      </div>


      <div className='w-[40%] h-[80%] flex flex-col items-start justify-start gap-5'>
        <div className='w-full flex flex-col items-start justify-start text-xl'>
          <span className='font-bold text-2xl'>{listing.title}</span>
          <span className='text-gray-600'>{listing.location}</span>
        </div>
        <p className='text-gray-800'>{listing.description}</p>
        <div className='w-full flex flex-row justify-start items-center gap-5'>
          <span className='text-green-700 font-semibold'>₹{listing.price_per_night} / night</span>
          <span>⭐ {listing.average_rating || 'N/A'}</span>
        </div>
        <div className='w-full h-[15%] flex justify-start items-center border-t pt-4'>
          <button
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
            onClick={handleBookClick}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
