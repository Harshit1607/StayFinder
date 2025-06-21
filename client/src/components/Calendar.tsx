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
    <div className="relative w-[90%] max-w-4xl h-[70%] bg-[#111] text-white p-8 rounded shadow-2xl border border-gray-700">
      <button
        className="absolute top-4 left-4 text-white text-2xl hover:text-yellow-600 transition"
        onClick={() => window.history.back()}
      >
        <IoArrowBack />
      </button>

      <h2 className="text-xl font-semibold text-yellow-600 mb-6 text-center">Select Booking Dates</h2>

      <div className="flex flex-col md:flex-row justify-between gap-8 mt-4">
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-300 mb-2">Check-In</label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            className="bg-[#222] text-white border border-gray-600 rounded px-4 py-2 w-full focus:outline-none"
            placeholderText="Select check-in date"
            calendarClassName="dark-datepicker"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-300 mb-2">Check-Out</label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            className="bg-[#222] text-white border border-gray-600 rounded px-4 py-2 w-full focus:outline-none"
            placeholderText="Select check-out date"
            calendarClassName="dark-datepicker"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => {
            if (checkIn && checkOut) {
              dispatch(setBookingDates({
                checkIn: checkIn.toISOString(),
                checkOut: checkOut.toISOString(),
              }));
              onClose(checkIn, checkOut);
            } else {
              alert('Please select both check-in and check-out dates.');
            }
          }}
          className="bg-yellow-700 text-white px-6 py-2 rounded hover:bg-yellow-800 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Calendar;
