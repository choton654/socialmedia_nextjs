import { Grid, withStyles } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect } from "react";
import Post from "../../../components/Post";
import Profile from "../../../components/Profile";
import { DataState } from "../../../context/context/dataContext";
import { UserState } from "../../../context/context/userContext";
function User({ data, classes, user, postId }) {
  const { credential, posts } = data;

  const { loadUser } = UserState();

  const { loadPosts } = DataState();

  useEffect(() => {
    if (user) {
      loadUser(user);
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
          ) : !postId ? (
            posts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            posts.map((post) => {
              if (post._id !== postId) {
                return <Post key={post.id} post={post} />;
              } else {
                return (
                  <Post key={post.id} post={post} postId={postId} openDialog />
                );
              }
            })
          )}
        </Grid>
        <Grid item sm={4} xs={12}>
          {User === null ? (
            <p>no user found</p>
          ) : (
            <Profile user={data} isCurrent={false} />
          )}
        </Grid>
      </Grid>
    </main>
  );
}

const styles = (theme) => ({
  root: {
    maxWidth: "1200px",
    margin: "80px auto 0 auto",
  },
});

User.getInitialProps = async ({ query, pathname }) => {
  console.log(query);

  try {
    const { id, postId } = query;
    const { data } = await Axios.get(
      ` https://enigmatic-tor-00686.herokuapp.com/${process.env.PORT}/api/v1/user/${id}`
    );
    return { data, postId };
  } catch (error) {
    console.error(error.response);
    return { data: null };
  }
};

export default withStyles(styles)(User);
// `http://localhost:3000/api/v1/user/${id}`
