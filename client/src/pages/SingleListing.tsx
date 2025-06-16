import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchSingleListing } from '../store/listingsSlice';
import ListingInfo from '../components/ListingInfo';

const SingleListing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { singleListing, loading, error } = useAppSelector((state) => state.listings);

  useEffect(() => {
    if (id) dispatch(fetchSingleListing(Number(id)));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!singleListing) return <p>Listing not found</p>;

  return (
    <div className='w-screen h-screen'>
      <ListingInfo listing={singleListing} />
    </div>
  );
};

export default SingleListing;
