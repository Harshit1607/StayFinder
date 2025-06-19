import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { loadRazorpay } from '../utils/razorpay';
import { createOrder, verifyPayment } from '../store/paymentSlice';
import { useNavigate } from 'react-router-dom';

interface BookingSummaryProps {
  listing: { id: number; title: string; price_per_night: string };
  checkIn: Date;
  checkOut: Date;
  onClose: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  listing,
  checkIn,
  checkOut,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((s) => s.auth);
  const { order, userOrder, makePayment, loading, error } = useAppSelector((s) => s.payment);

  if (!checkIn || !checkOut || !listing || !user) return null;

  const nights = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24);
  const total = nights * Number(listing.price_per_night);

  const handlePayment = () => {
    dispatch(
      createOrder({
        amount: total,
        userId: user.id,
        listingId: listing.id,
        checkIn,
        checkOut,
      })
    );
  };

  useEffect(() => {
    const runPayment = async () => {
      const sdkReady = await loadRazorpay();
      if (!sdkReady) return alert('Razorpay SDK failed to load');

      if (order && makePayment) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: order.amount,
          currency: 'INR',
          name: listing.title,
          description: 'Booking Payment',
          order_id: order.id,
          handler: (res: any) => {
            const paymentDetails = {
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_order_id: res.razorpay_order_id,
              razorpay_signature: res.razorpay_signature,
            };

            if (userOrder?.id) {
              dispatch(verifyPayment({ orderId: userOrder.id, paymentDetails }));
            } else {
              alert('Order not found. Please try again.');
              console.error('Order ID missing:', order, userOrder);
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: (user as any).phone_number,
          },
        };
        new (window as any).Razorpay(options).open();
      }
    };
    runPayment();
  }, [order, makePayment]);

  useEffect(() => {
    if (!makePayment && order && userOrder) {
      // Redirect to homepage after successful payment
      navigate('/');
    }
  }, [makePayment, order, userOrder]);

  return (
    <div className="w-[90%] max-w-2xl bg-black text-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
      <p>
        <strong>Listing:</strong> {listing.title}
      </p>
      <p>
        <strong>Check-in:</strong> {checkIn.toDateString()}
      </p>
      <p>
        <strong>Check-out:</strong> {checkOut.toDateString()}
      </p>
      <p>
        <strong>Nights:</strong> {nights}
      </p>
      <p>
        <strong>Total:</strong> ₹{total}
      </p>

      <div className="flex gap-4 mt-6">
        <button
          disabled={loading}
          onClick={handlePayment}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition disabled:opacity-50"
        >
          Book Now
        </button>
        <button
          onClick={onClose}
          className="bg-gray-700 hover:bg-gray-800 px-6 py-2 rounded transition"
        >
          Cancel
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default BookingSummary;
