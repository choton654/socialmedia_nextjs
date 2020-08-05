import { withStyles } from '@material-ui/core';
import React from 'react';

function signup({ classes }) {
  return (
    <main className={classes.root}>
      <h1>signup page</h1>
    </main>
  );
}

const styles = (theme) => ({
  root: {
    maxWidth: '1200px',
    margin: '80px auto 0 auto',
  },
});

export default withStyles(styles)(signup);
