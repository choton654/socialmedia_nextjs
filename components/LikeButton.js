import { Tooltip } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
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
            <Tooltip
              title='login'
              style={{
                cursor: 'pointer',
              }}>
              <ThumbUpIcon color='primary' />
            </Tooltip>
          </a>
        </Link>
      ) : (
        <Tooltip
          style={{
            cursor: 'pointer',
          }}
          title='like Unlike'
          placement='top'
          onClick={() => {
            likeUnlikePosts(id);
          }}>
          <ThumbUpIcon color='primary' />
        </Tooltip>
      )}
    </div>
  );
}

export default LikeButton;
