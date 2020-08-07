import {
  Button,
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

function Profile({ classes, user }) {
  const {
    state: { authenticated },
  } = UserState();

  const { uploadImage } = UserState();
  console.log(user);
  let formData;
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    formData = new FormData();
    formData.append('file', image, image.name);
    uploadImage(formData);
  };
  // const token = cookie.get('token');
  // const { data } = useSWR('/api/v1/user/image', (url) =>
  //   Axios({
  //     method: 'put',
  //     url: url,
  //     data: formData,
  //     headers: { Authorization: token },
  //   })
  //     .then((r) => r.data)
  //     .catch((err) => console.error(err)),
  // );
  // console.log(data);

  const handleEditPicture = () => {
    const imageInput = document.getElementById('imageInput');
    imageInput.click();
  };

  return (
    <div>
      {user ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className='image-wrapper'>
              <img
                src={user.credential.avatar}
                alt='avatar'
                className='profile-image'
              />
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
              <Link href={`/user/${user.credential.name}`}>
                <MuiLink variant='h5' color='primary'>
                  @{user.credential.name}
                </MuiLink>
              </Link>
              <hr />
              {user.credential.bio && (
                <Typography variant='body2'>{user.credential.bio}</Typography>
              )}
              <hr />
              {user.credential.location && (
                <>
                  <LocationOn color='primary' />{' '}
                  <span>{user.credential.location}</span>
                  <hr />
                </>
              )}
              {user.credential.website && (
                <>
                  <LinkIcon color='primary' />
                  <a
                    href={user.credential.website}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {' '}
                    {user.credential.website}
                  </a>
                  <hr />
                </>
              )}
              <CalendarToday color='primary' />{' '}
              <span>
                Joined {dayjs(user.credential.createdAt).format('MMM YYYY')}
              </span>
            </div>
            {/* <MyButton tip='Logout' onClick={this.handleLogout}>
              <KeyboardReturn color='primary' />
            </MyButton>
            <EditDetails /> */}
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant='body2' align='center'>
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Link href='/login'>
              <Button variant='contained' color='primary'>
                <a>LogIn</a>
              </Button>
            </Link>
            <Link href='/signup'>
              <Button variant='contained' color='secondary'>
                <a>SignUp</a>
              </Button>
            </Link>
          </div>
        </Paper>
      )}
    </div>
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
