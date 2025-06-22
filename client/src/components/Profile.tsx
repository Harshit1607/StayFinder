import React from 'react';
import { useAppSelector } from '../hooks/useRedux';

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto bg-[#1e1e1e] p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-yellow-500 mb-6">Your Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {(user as any).phone_number}</p>
    </div>
  );
};

export default Profile;
