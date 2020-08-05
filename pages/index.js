import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import React, { useState } from 'react';
import Post from '../components/Post';
function index({ classes, posts }) {
  const initialState = {};

  const [state, setstate] = useState(initialState);

  let recentPostMarkup =
    posts.length !== 0 ? (
      posts.map((post) => <Post key={post._id} post={post} />)
    ) : (
      <p>loading...</p>
    );
  return (
    <main className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPostMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p color='primary'>Profile</p>
        </Grid>
      </Grid>
    </main>
  );
}

const styles = (theme) => ({
  root: {
    maxWidth: '1200px',
    margin: '80px auto 0 auto',
  },
});

index.getInitialProps = async () => {
  let posts = [];
  const res = await Axios.get('http://localhost:3000/api/v1/post');
  posts = res.data;
  return { posts };
};

export default withStyles(styles)(index);
