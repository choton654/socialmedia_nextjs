import { Grid, Typography, withStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

function Comments({ comments, classes }) {
  return (
    <div>
      <Grid container>
        {comments.map((comment) => {
          const {
            text,
            createdAt,
            avatar,
            user: { name },
          } = comment;
          return (
            <div key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={avatar}
                      alt='comment'
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography variant='h5' color='primary'>
                        <Link href={`/user/${name}`}>
                          <a>{name}</a>
                        </Link>
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
