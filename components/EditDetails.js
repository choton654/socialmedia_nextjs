import { Tooltip, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { UserState } from '../context/context/userContext';
function EditDetails({ user, classes, editUserDetails }) {
  const [state, setstate] = useState({
    bio: '',
    name: '',
    location: '',
    website: '',
    open: false,
  });

  const handleOpen = () => {
    setstate({
      ...state,
      bio: credential.bio ? credential.bio : '',
      name: credential.name ? credential.name : '',
      website: credential.website ? credential.website : '',
      location: credential.location ? credential.location : '',
      open: true,
    });
  };
  const handleClose = () => {
    setstate({ ...state, open: false });
  };

  const {
    state: { credential },
  } = UserState();

  useEffect(() => {
    setstate({
      ...state,
      bio: credential.bio ? credential.bio : '',
      name: credential.name ? credential.name : '',
      website: credential.website ? credential.website : '',
      location: credential.location ? credential.location : '',
    });
  }, []);

  const handleChange = (event) => {
    setstate({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    const userDetails = {
      name: state.name,
      bio: state.bio,
      website: state.website,
      location: state.location,
    };
    editUserDetails(userDetails);
    handleClose();
  };

  return (
    <>
      <Tooltip
        title='Edit Profile'
        style={{
          cursor: 'pointer',
        }}>
        <Button variant='contained' color='primary' onClick={handleOpen}>
          Edit
        </Button>
      </Tooltip>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='name'
              tpye='text'
              label='name'
              placeholder='Your name'
              className={classes.textField}
              value={state.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='bio'
              tpye='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='website'
              tpye='text'
              label='Website'
              placeholder='Your personal/professinal website'
              className={classes.textField}
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='location'
              tpye='text'
              label='Location'
              placeholder='Where you live'
              className={classes.textField}
              value={state.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const styles = (theme) => ({
  textField: {
    margin: '10px auto 10 auto',
  },
  button: {
    marginTop: 20,
    margin: 'auto',
  },
});

export default withStyles(styles)(EditDetails);
