import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchUserBookings } from '../store/bookingsSlice';

const Bookings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading, error } = useAppSelector((s) => s.bookings);
  const { user } = useAppSelector((s) => s.auth);

  console.log(bookings)

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [dispatch, user]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div key={b.id} className="bg-[#1f1f1f] rounded-lg shadow-lg overflow-hidden">
              <img
                src={b.listings.image_url[0]}
                alt={b.listings.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{b.listings.title}</h3>
                <p className="text-gray-400">{b.listings.location}</p>
                <p><strong>From:</strong> {new Date(b.start_date).toDateString()}</p>
                <p><strong>To:</strong> {new Date(b.end_date).toDateString()}</p>
                <p><strong>Total:</strong> ₹{b.total_price}</p>
                {b.rating && <p><strong>Rating:</strong> {b.rating}/5</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
