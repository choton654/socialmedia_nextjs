import { Grid, Tooltip, Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { DataState } from '../context/context/dataContext';
import { UserState } from '../context/context/userContext';

function Comments({ comments, classes }) {
  const {
    state: {
      authenticated,
      credential: { _id: userId },
    },
  } = UserState();
  const { deleteComment } = DataState();
  return (
    <div>
      <Grid container>
        {comments.map((comment) => {
          const {
            postId,
            _id,
            text,
            createdAt,
            avatar,
            user: { name, _id: id },
          } = comment;
          const isDelete = authenticated && id === userId;
          return (
            <div key={createdAt}>
              <Grid item sm={12}>
                <Grid
                  container
                  style={{
                    paddingTop: '10px',
                  }}>
                  <Grid item sm={4}>
                    <img
                      src={avatar}
                      alt='comment'
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={8}>
                    <div className={classes.commentData}>
                      <Typography variant='h5' color='primary'>
                        <>
                          <Link href={`/user/${id}`}>
                            <a>{name}</a>
                          </Link>
                          {isDelete && (
                            <Tooltip
                              title='Delete Comment'
                              placement='top'
                              style={{
                                cursor: 'pointer',
                              }}>
                              <DeleteIcon
                                color='error'
                                onClick={() => deleteComment(_id, postId)}
                              />
                            </Tooltip>
                          )}
                        </>
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <Typography variabnt='body1'>{text}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Grid>
    </div>
  );
}

const styles = (theme) => ({
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
});

export default withStyles(styles)(Comments);
