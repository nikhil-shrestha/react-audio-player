import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropsTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '260px',
    boxSizing: 'border-box',
    overflow: 'scroll',
  },
  item: {
    width: '100%',
    height: '45px',
    cursor: 'pointer',
    color: '#b2b2b2',
    marginLeft: '2rem',
    marginTop: '1rem',
    display: 'flex',
    boxSizing: 'border-box',
  },
  image: {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
  author: {
    textTransform: 'uppercase',
    fontSize: '0.6rem',
    fontWeight: 300,
  },
}));

export function Playlist(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {props.playlist.map((track) => (
        <div
          className={classes.item}
          key={track.id}
          onClick={() => props.onChangeTrack(track.id)}
        >
          <img className={classes.image} src={track.cover} alt="cover" />
          <div className={classes.description}>
            <p className={classes.title}>{track.title}</p>
            <p className={classes.author}>{track.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

Playlist.PropsTypes = {
  playlist: PropsTypes.array,
  onChangeTrack: PropsTypes.func,
};
