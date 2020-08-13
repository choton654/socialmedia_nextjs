import { Badge, Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from 'next/link';
import React from 'react';
import { DataState } from '../context/context/dataContext';
import { UserState } from '../context/context/userContext';
function LikeButton({ id, likes }) {
  const { likeUnlikePosts } = DataState();
  const {
    state: { authenticated, likes: userLikes },
  } = UserState();

  // const likedPost = () => {
  //   if (userLikes && userLikes.find((like) => like?.postId === id)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

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
              <FavoriteIcon color='primary' />
            </Tooltip>
          </a>
        </Link>
      ) : (
        <Tooltip
          title='Like Unlike'
          placement='top'
          style={{
            cursor: 'pointer',
          }}>
          <Badge
            style={{
              cursor: 'pointer',
            }}
            badgeContent={likes}
            color='secondary'
            onClick={() => {
              likeUnlikePosts(id);
            }}>
            <FavoriteIcon color='primary' />
          </Badge>
        </Tooltip>
      )}
    </div>
  );
}

{
  /* <Tooltip
          style={{
            cursor: 'pointer',
          }}
          title='like Unlike'
          placement='top'
          onClick={() => {
            likeUnlikePosts(id);
          }}>
        </Tooltip> */
}

export default LikeButton;
