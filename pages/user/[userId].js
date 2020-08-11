import { Grid, withStyles } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect } from 'react';
import Post from '../../components/Post';
import Profile from '../../components/Profile';
import { DataState } from '../../context/context/dataContext';
import { UserState } from '../../context/context/userContext';
function User({ data, classes, user }) {
  const { credential: User, posts } = data;
  console.log(user, posts);

  const { loadUser } = UserState();

  const { loadPosts } = DataState();

  useEffect(() => {
    if (user) {
      loadUser(data);
    }
    if (posts) {
      loadPosts(posts);
    }
  }, [user, posts]);

  return (
    <main className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {posts === null ? (
            <p>No posts from this user</p>
          ) : (
            posts.map((post) => <Post key={post.id} post={post} />)
          )}
        </Grid>
        <Grid item sm={4} xs={12}>
          {User === null ? (
            <p>no user found</p>
          ) : (
            <Profile user={User} isCurrent={false} />
          )}
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

User.getInitialProps = async ({ query: { userId: id } }) => {
  const { data } = await Axios.get(`http://localhost:3000/api/v1/user/${id}`);
  console.log(data);

  return { data };
};

export default withStyles(styles)(User);
