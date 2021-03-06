import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateFollowers, updateFollowing } from '../../utils/firebase';

export default function SuggestedProfile({ 
    suggProfDocId, 
    username, 
    profileId, 
    userId ,
    loggedInUserDocId 
  }) {
  const [followed, setFollowed] = useState(false);

  async function handleFollow() {
    setFollowed(true);
    // add profileId to 'following' array for logged-in user(userId) -> need docId
    await updateFollowing(loggedInUserDocId, profileId, false);
    // add userId to 'followers' array for followed user(profileId) -> userDocId
    await updateFollowers(suggProfDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <Link to={`/p/${username}`}>
        <div className="flex items-center justify-between">
          <img
            className="rounded-full w-8 flex mr-3"
            src={`https://gramstamatic-pics.s3.us-west-1.amazonaws.com/avatars/${username}.jpg`}
            alt=""
          />
          <p className="font-bold text-sm">{username}</p>
        </div>
      </Link>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollow}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  suggProfDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
}
