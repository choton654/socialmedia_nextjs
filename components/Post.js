import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React from 'react';

function Post({
  classes,
  post: {
    title,
    user: { avatar, name },
    comments,
    likes,
    id,
    createdAt,
  },
}) {
  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <CardMedia
        image={avatar}
        title='Profile Image'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography variant='h5' color='primary'>
          <Link href={`/user/${name}`}>
            <a
              style={{
                textDecoration: 'none',
              }}>
              {name}
            </a>
          </Link>
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{title}</Typography>
      </CardContent>
    </Card>
  );
}

const styles = (theme) => ({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
});

export default withStyles(styles)(Post);
