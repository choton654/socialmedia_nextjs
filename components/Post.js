import { CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React from 'react';
import DeletePost from '../components/DeletePost';
import { DataState } from '../context/context/dataContext';
import { UserState } from '../context/context/userContext';
function Post({
  classes,
  post: {
    title,
    user: { avatar, name, _id },
    comments,
    likes,
    id,
    createdAt,
  },
}) {
  dayjs.extend(relativeTime);
  const { likeUnlikePosts, deletePost } = DataState();
  const {
    state: {
      authenticated,
      likes: userLikes,
      credential: { _id: userId },
    },
  } = UserState();

  const likedPost = () => {
    if (userLikes && userLikes.find((like) => like?.postId === id)) {
      return true;
    } else {
      return false;
    }
  };

  const isDelete = authenticated && _id === userId;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={avatar}
        title='Profile Image'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography variant='h5' color='primary'>
          <Link href={`/user/${name}`}>
            <a
              style={{
                textDecoration: 'none',
              }}>
              {name}
            </a>
          </Link>
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{title}</Typography>
      </CardContent>
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
          onClick={() => {
            likeUnlikePosts(id);
          }}>
          <FavoriteIcon color='primary' />
        </Tooltip>
      ) : (
        <Tooltip
          title='Like'
          onClick={() => {
            likeUnlikePosts(id);
          }}>
          <FavoriteBorderIcon color='primary' />
        </Tooltip>
      )}
      <span>{likes} Likes</span>
      <Tooltip title='Comments'>
        <ChatIcon color='primary' />
      </Tooltip>
      <span>{comments} Comments</span>
      {isDelete && <DeletePost id={id} />}
    </Card>
  );
}

const styles = (theme) => ({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
});

export default withStyles(styles)(Post);
