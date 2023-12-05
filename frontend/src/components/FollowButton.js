import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FollowButton.css';

function FollowButton({ userId, isFollowing, onToggleFollow }) {
  const [loading, setLoading] = useState(false);

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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="button-container">
      <button
        className="follow-button"
        onClick={toggleFollow}
        disabled={loading}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}

export default FollowButton;
