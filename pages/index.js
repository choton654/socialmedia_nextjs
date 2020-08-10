import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import React, { useEffect } from 'react';
import Post from '../components/Post';
import Profile from '../components/Profile';
import { DataState } from '../context/context/dataContext';
import { UserState } from '../context/context/userContext';
function Index({ classes, posts, user }) {
  const { loadUser } = UserState();
  const {
    loadPosts,
    state: { posts: statePosts },
  } = DataState();

  useEffect(() => {
    if (user) {
      loadUser(user);
    }
    if (posts) {
      loadPosts(posts);
    }
  }, [user, posts]);

  let recentPostMarkup =
    statePosts.length !== 0 ? (
      statePosts.map((post) => <Post key={post._id} post={post} />)
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

Index.getInitialProps = async (ctx) => {
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
