import { CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React from 'react';
import DeletePost from '../components/DeletePost';
import { UserState } from '../context/context/userContext';
import LikeButton from './LikeButton';
import PostDialog from './PostDialog';

function Post({
  classes,
  openDialog,
  postId,
  post: {
    title,
    user: { avatar, name, _id: userId },
    comments,
    likes,
    id,
    createdAt,
  },
}) {
  dayjs.extend(relativeTime);
  const {
    state: {
      authenticated,
      likes: userLikes,
      credential: { _id: authUserId },
    },
  } = UserState();

  const isDelete = authenticated && userId === authUserId;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={avatar}
        title='Profile Image'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography variant='h5' color='primary'>
          <Link href={`/user/${userId}`}>
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
        <div
          style={{
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <LikeButton id={id} />
          <span>{likes} Likes</span>
          <PostDialog
            id={id}
            comments={comments}
            userId={userId}
            postId={postId}
            openDialog
          />
          <span>{comments} Comments</span>
          {isDelete && <DeletePost id={id} />}
        </div>
      </CardContent>
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
