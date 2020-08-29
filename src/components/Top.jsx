import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropsTypes from 'prop-types';
import { Audio } from './Audio';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '5px 5px 0 0',
    height: '240px',
    padding: '2rem',
    display: 'flex',
    flexWrap: 'wrap',
    color: '#27117c',
    boxSizing: 'border-box',
    backgroundImage:
      'linear-gradient(to bottom, #ebe6f8, #ece5f6, #ede4f5, #eee4f3, #efe3f1)',
  },
  cover: {
    width: '135px',
    height: '135px',
    borderRadius: '5px',
    marginRight: '1rem',
  },
  info: {
    marginTop: '1rem',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  author: {
    fontSize: '0.8rem',
    fontWeight: 400,
    textTransform: 'uppercase',
    marginTop: '0.5rem',
  },
  controls: {
    flexBasis: '100%',
    marginTop: '1.5rem',
  },
}));

export function Top(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img className={classes.cover} src={props.track.cover} alt="cover" />
      <div className={classes.info}>
        <p className={classes.title}>{props.track.title}</p>
        <p className={classes.author}>{props.track.author}</p>
      </div>
      <div className={classes.controls}>
        <Audio url={props.track.url} />
      </div>
    </div>
  );
}

Top.propTypes = {
  track: PropsTypes.object,
};
