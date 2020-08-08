import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import cookie from 'js-cookie';
import React, { useState } from 'react';
import Post from '../components/Post';
import Profile from '../components/Profile';
function Index({ classes, posts, user }) {
  const initialState = {
    authenticated: false,
    loading: false,
    error: null,
    credential: {},
    likes: [],
    notifications: [],
  };
  const [state, setstate] = useState(initialState);

  const uploadImage = async (formData) => {
    try {
      const token = cookie.get('token');
      const res = await Axios.put('/api/v1/user/image', formData, {
        headers: { Authorization: token },
      });
      getUserData();
    } catch (error) {
      setstate({ ...state, loading: false, error: error.response.data });
      console.error(error);
    }
  };

  const editUserDetails = async (userDetails) => {
    setstate({ ...state, loading: true });
    try {
      const token = cookie.get('token');
      const res = await Axios.put('/api/v1/user', userDetails, {
        headers: { Authorization: token },
      });
      getUserData();
    } catch (error) {
      setstate({ ...state, loading: false, error: error.response.data });
      console.error(error);
    }
  };

  const getUserData = async () => {
    setstate({ ...state, loading: true });

    try {
      const token = cookie.get('token');
      const res = await Axios.get('/api/v1/user', {
        headers: { Authorization: token },
      });
      setstate({
        ...state,
        ...res.data,
        loading: false,
        authenticated: true,
      });
    } catch (error) {
      console.error(error);
      setstate({ ...state, loading: false, error: error.response.data });
    }
  };

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
          <Profile
            user={user}
            editUserDetails={editUserDetails}
            uploadImage={uploadImage}
          />
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
