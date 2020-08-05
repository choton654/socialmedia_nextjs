import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import React, { Component } from 'react';
export class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbarTitle}>
          <Button color='inherit'>
            <Link href='/'>
              <a className={classes.icon}>Home</a>
            </Link>
          </Button>
          <Button color='inherit'>
            <Link href='/login'>
              <a className={classes.icon}>Login</a>
            </Link>
          </Button>
          <Button color='inherit'>
            <Link href='/signup'>
              <a className={classes.icon}>Signup</a>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = (theme) => ({
  appBar: {
    // z-index 1 higher than the fixed drawer in home page to clip it under the navigation
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