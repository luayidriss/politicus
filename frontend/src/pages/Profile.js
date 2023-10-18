import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

const Profile = () => {
  const { userId } = useParams();

  return (
    <div>
      <UserProfile userId={userId} />
    </div>
  );
};

export default Profile;
