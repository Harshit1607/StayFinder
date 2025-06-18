import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import { useAppDispatch } from '../hooks/useRedux';
import { setBookingDates } from '../store/bookingsSlice';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarProps {
  onClose: (inDate: Date, outDate: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onClose }) => {
  const [checkIn, setCheckIn] = React.useState<Date | null>(null);
  const [checkOut, setCheckOut] = React.useState<Date | null>(null);
  const dispatch = useAppDispatch();

  return (
    <div className='relative w-[90%] max-w-4xl h-[70%] bg-white p-6 rounded shadow-lg text-black'>
      <button
        className='absolute top-4 left-4 text-xl'
        onClick={() => window.history.back()}
      >
        <IoArrowBack />
      </button>

      <div className='w-full h-full flex flex-col md:flex-row justify-between gap-8 mt-8'>
        <div className='flex flex-col items-start'>
          <label className='font-semibold mb-2'>Check-In</label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            className='border rounded px-3 py-2 w-full'
            placeholderText='Select check-in date'
          />
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold mb-2'>Check-Out</label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            className='border rounded px-3 py-2 w-full'
            placeholderText='Select check-out date'
          />
        </div>
      </div>

      <div className='mt-10 w-full flex justify-center'>
        <button
          onClick={() => {
            if (checkIn && checkOut) {
              dispatch(setBookingDates({
                checkIn: checkIn.toISOString(),
                checkOut: checkOut.toISOString(),
              }));
              onClose(checkIn, checkOut); // ✅ Pass selected dates back
            } else {
              alert('Please select check-in and check-out dates.');
            }
          }}
          className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Calendar;
