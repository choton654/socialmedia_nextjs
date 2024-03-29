import {
  Badge,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DataState } from '../context/context/dataContext';
import CommentForm from './CommentForm';
import Comments from './Comments';
import LikeButton from './LikeButton';

function PostDialog({
  id,
  postId,
  userId,
  openDialog,
  classes,
  comments: commentCount,
}) {
  const [state, setstate] = useState({
    open: false,
  });

  const {
    getSinglePost,
    clearErrors,
    state: {
      loading,
      post: {
        title,
        user: { avatar, name, _id },
        comments,
        likes,
        createdAt,
      },
    },
  } = DataState();

  useEffect(() => {
    if (openDialog && postId) {
      handleOpen(postId);
    }
  }, [openDialog, postId]);

  const router = useRouter();

  const handleOpen = (postId) => {
    setstate({
      ...state,
      open: true,
    });
    getSinglePost(postId ? postId : id);
  };
  const handleClose = () => {
    window.history.pushState(null, null, state.oldPath);
    clearErrors();
    setstate({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Tooltip
        title='Comments'
        placement='top'
        onClick={() => handleOpen()}
        style={{
          cursor: 'pointer',
        }}>
        <Badge badgeContent={commentCount} color='secondary'>
          <ChatIcon color='primary' />
        </Badge>
      </Tooltip>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
        <CloseIcon
          onClick={handleClose}
          style={{
            margin: '10px auto',
            cursor: 'pointer',
          }}
        />
        <DialogContent className={classes.dialogContent}>
          {loading ? (
            <div className={classes.spinnerDiv}>
              <CircularProgress color='secondary' />
            </div>
          ) : (
            <>
              <Grid container>
                <Grid item sm={5}>
                  <img
                    src={avatar}
                    alt='Profile'
                    className={classes.profileImage}
                  />
                </Grid>
                <Grid item sm={7}>
                  <Link href={`/user/${_id}`}>
                    <a>
                      <Typography color='primary' variant='h5'>
                        @{name}
                      </Typography>
                    </a>
                  </Link>
                  <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>
                  <Typography variant='body1'>{title}</Typography>
                  <div
                    style={{
                      paddingTop: '10px',
                      // width: '50px',
                      display: 'flex',
                      // justifyContent: 'space-between',
                    }}>
                    <LikeButton id={id} likes={likes} />
                    <Tooltip
                      title='Comments'
                      placement='top'
                      style={{
                        cursor: 'pointer',
                      }}>
                      <Badge
                        style={{
                          cursor: 'pointer',
                        }}
                        badgeContent={commentCount}
                        color='secondary'>
                        <ChatIcon color='primary' />
                      </Badge>
                    </Tooltip>
                  </div>
                </Grid>
                <Grid item sm={12}>
                  <CommentForm id={id} />
                  <Comments comments={comments} />
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const styles = (theme) => ({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

export default withStyles(styles)(PostDialog);
