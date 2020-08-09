import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import React from 'react';
import Post from '../components/Post';
import Profile from '../components/Profile';
function Index({ classes, posts, user }) {
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
          <Profile user={user} />
        </Grid>
      </Grid>
    </main>
  );
}

Index.getInitialProps = async () => {
  let posts = [];
  const res = await Axios.get('http://localhost:3000/api/v1/post');
  posts = res.data;
  return { posts };
};

const styles = (theme) => ({
  root: {
    maxWidth: '1200px',
    margin: '80px auto 0 auto',
  },
});

export default withStyles(styles)(Index);
