import {
  CircularProgress,
  IconButton,
  Link,
  Paper,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import dayjs from 'dayjs';
import React from 'react';
import { UserState } from '../context/context/userContext';
import EditDetails from './EditDetails';

function Profile({ classes, user }) {
  const {
    editUserDetails,
    uploadImage,
    state: {
      authenticated,
      loading,
      credential: { avatar, name, bio, location, website, createdAt },
    },
  } = UserState();

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('file', image, image.name);
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const imageInput = document.getElementById('imageInput');
    imageInput.click();
  };

  return !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img src={avatar} alt='avatar' className='profile-image' />
            <input
              type='file'
              id='imageInput'
              hidden='hidden'
              onChange={handleImageChange}
            />
            <Tooltip title='Edit profile picture' placement='top'>
              <IconButton onClick={handleEditPicture}>
                <EditIcon color='primary' />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className='profile-details'>
            <Link href={`/user/${name}`}>
              <MuiLink variant='h5' color='primary'>
                @{name}
              </MuiLink>
            </Link>
            <hr />
            {bio && <Typography variant='body2'>{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color='primary' /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color='primary' />
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {' '}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color='primary' />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>

          <EditDetails
            className={classes.buttons}
            user={user}
            editUserDetails={editUserDetails}
          />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant='body1' align='center'>
          No profile found, please login again
        </Typography>
      </Paper>
    )
  ) : (
    <CircularProgress color='secondary' />
  );
}

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: '#00bcd4',
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '0 10px',
    },
  },
});

export default withStyles(styles)(Profile);
