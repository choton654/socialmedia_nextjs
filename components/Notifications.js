import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { UserState } from '../context/context/userContext';
function Notifications() {
  const [state, setstate] = useState({
    anchorEl: null,
  });

  const router = useRouter();

  const {
    state: { notifications },
    markNotificationsRead,
  } = UserState();

  dayjs.extend(relativeTime);

  const handleOpen = (event) => {
    setstate({ anchorEl: event.target });
  };
  const handleClose = () => {
    setstate({ anchorEl: null });
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    markNotificationsRead(unreadNotificationsIds);
  };

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color='secondary'>
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? 'primary' : 'secondary';
        const icon =
          not.type === 'like' ? (
            <ThumbUpIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              color='default'
              variant='body1'
              onClick={() =>
                router.push({
                  pathname: `/user/${not.recipient}`,
                  query: { postId: not.postId },
                })
              }>
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <div>
      <>
        <Tooltip placement='top' title='Notifications'>
          <IconButton
            aria-owns={state.anchorEl ? 'simple-menu' : undefined}
            aria-haspopup='true'
            onClick={handleOpen}>
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={state.anchorEl}
          open={Boolean(state.anchorEl)}
          onClose={handleClose}
          onEntered={onMenuOpened}>
          {notificationsMarkup}
        </Menu>
      </>
    </div>
  );
}

export default Notifications;
