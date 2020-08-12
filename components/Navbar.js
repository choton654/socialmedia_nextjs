import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import React from 'react';
import { UserState } from '../context/context/userContext';
import AddPost from './AddPost';
function Navbar({ classes, user }) {
  const {
    logOutUser,
    state: { authenticated },
  } = UserState();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbarTitle}>
        {!authenticated ? (
          <>
            <Link href='/login'>
              <a className={classes.icon}>Login</a>
            </Link>
            <Link href='/signup'>
              <a className={classes.icon}>Signup</a>
            </Link>
          </>
        ) : (
          <>
            <Link href='/'>
              <a className={classes.icon}>Home</a>
            </Link>
            <AddPost />
            <Button color='inherit' className={classes.icon}>
              Notifications
            </Button>
            <Button
              color='inherit'
              className={classes.icon}
              onClick={() => logOutUser()}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarTitle: {
    flex: 1,
    margin: 'auto',
    padding: 0,
  },
  icon: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#fff',
    marginRight: theme.spacing(1),
  },
});

export default withStyles(styles)(Navbar);
