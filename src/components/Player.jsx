import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Playlist } from './Playlist';
import { Top } from './Top';
import { fetchPlaylist, PlaylistContext } from '../store/playlist';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '500px',
    height: '500px',
    margin: '0 auto',
    borderRadius: '5px',
    boxShadow: '0px 0px 15px -5px rgba(0, 0, 0, 0.75)',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export function Player() {
  const classes = useStyles();

  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  const handleChangeTrack = (id) => {
    setCurrentTrack(id);
  };

  const handleNextTrack = () => {
    if (currentTrack === playlist.length - 1) {
      setCurrentTrack(0);
      return;
    }
    setCurrentTrack(currentTrack + 1);
  };

  const handlePrevTrack = () => {
    if (currentTrack === 0) {
      setCurrentTrack(playlist.length - 1);
      return;
    }
    setCurrentTrack(currentTrack - 1);
  };

  const handleFetchData = async () => {
    const playlist = await fetchPlaylist();
    setPlaylist(playlist);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  if (playlist.length === 0) {
    return (
      <div className={classes.container}>
        <div className={classes.loading}>loading...</div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <PlaylistContext.Provider value={{ handleNextTrack, handlePrevTrack }}>
        <Top track={playlist[currentTrack]} />
        <Playlist onChangeTrack={handleChangeTrack} playlist={playlist} />
      </PlaylistContext.Provider>
    </div>
  );
}
