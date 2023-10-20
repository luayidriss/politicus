import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FollowButton({ userId, isFollowing, onToggleFollow }) {
  const [loading, setLoading] = useState(false);
  console.log(isFollowing)

  const toggleFollow = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (isFollowing) {
        await axios.delete(`/api/followers/unfollow/${userId}/`);
      } else {
        await axios.post(`/api/followers/follow/${userId}/`);
      }

      onToggleFollow(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={toggleFollow} disabled={loading}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;