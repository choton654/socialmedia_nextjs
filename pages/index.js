import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
function index({ classes }) {
  const initialState = {
    posts: [],
  };

  const [state, setstate] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      const res = await Axios.get('/api/v1/post');
      setstate({ posts: res.data });
    }
    fetchData();
  }, []);

  let recentPostMarkup =
    state.posts.length !== 0 ? (
      state.posts.map((post) => <Post key={post._id} post={post} />)
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

export default withStyles(styles)(index);
