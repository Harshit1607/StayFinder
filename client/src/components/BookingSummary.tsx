import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { loadRazorpay } from '../utils/razorpay';
import { createOrder, verifyPayment } from '../store/paymentSlice';

interface BookingSummaryProps {
  listing: { id: number; title: string; price_per_night: string; };
  checkIn: Date;
  checkOut: Date;
  onClose: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  listing, checkIn, checkOut, onClose,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { order, userOrder, makePayment, loading, error } = useAppSelector((s) => s.payment);
  
  if (!checkIn || !checkOut || !listing || !user) return null;

  const nights = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24);
  const total = nights * Number(listing.price_per_night);

  const handlePayment = () => {
    dispatch(createOrder({
      amount: total,
      userId: user.id,
      listingId: listing.id,
      checkIn,
      checkOut,
    }));
  };

  useEffect(() => {
    const runPayment = async () => {
      const sdkReady = await loadRazorpay();
      if (!sdkReady) return alert('Razorpay SDK failed to load');

      if (order && makePayment) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: listing.title,
          description: "Booking Payment",
          order_id: order.id,
          handler: (res: any) => {
            const paymentDetails = {
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_order_id: res.razorpay_order_id,
              razorpay_signature: res.razorpay_signature,
            };
            if (userOrder?._id) {
              dispatch(verifyPayment({ orderId: userOrder._id, paymentDetails }));
            } else {
              console.error("Order ID is missing");
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

  return (
    <div className="...">
      {/* Booking Summary UI */}
      <button disabled={loading} onClick={handlePayment}>Book Now</button>
      <button onClick={onClose}>Cancel</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default BookingSummary;
