import { Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Link from 'next/link';
import React from 'react';
import { DataState } from '../context/context/dataContext';
import { UserState } from '../context/context/userContext';

function LikeButton({ id }) {
  const { likeUnlikePosts } = DataState();
  const {
    state: { authenticated, likes: userLikes },
  } = UserState();

  const likedPost = () => {
    if (userLikes && userLikes.find((like) => like?.postId === id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
      }}>
      {!authenticated ? (
        <Link href='/login'>
          <a>
            <Tooltip title='Like'>
              <FavoriteBorderIcon color='primary' />
            </Tooltip>
          </a>
        </Link>
      ) : likedPost() ? (
        <Tooltip
          title='Undo like'
          placement='top'
          onClick={() => {
            likeUnlikePosts(id);
          }}>
          <FavoriteIcon color='primary' />
        </Tooltip>
      ) : (
        <Tooltip
          title='Like'
          placement='top'
          onClick={() => {
            likeUnlikePosts(id);
          }}>
          <FavoriteBorderIcon color='primary' />
        </Tooltip>
      )}
    </div>
  );
}

export default LikeButton;
