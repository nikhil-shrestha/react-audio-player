import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import {
  SkipPrevious as SkipPreviousIcon,
  PlayArrow as PlayArrowIcon,
  SkipNext as SkipNextIcon,
  Pause as PauseIcon,
} from '@material-ui/icons';

import { ProgressBar } from './ProgressBar';
import { PlaylistContext } from '../store/playlist';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counter: {
    fontSize: '0.65rem',
    margin: '0 1rem',
    color: '#472f90',
  },
}));

const getSecondsToMinutesAndSeconds = (time) => {
  if (time === 0) {
    return '0 : 00';
  }
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes} : 0${seconds}`;
};

export function Audio(props) {
  const classes = useStyles();

  let audioPlayer;

  const [currentTrackDuration, setCurrentTrackDuration] = useState(0);
  const [currentTrackMoment, setCurrentTrackMoment] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState('0');
  const [isPlaying, setIsPlaying] = useState(false);

  const initPlayer = () => {
    audioPlayer = document.getElementById('audioPlayer');
  };

  const handleStop = () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0.0;
    setIsPlaying(false);
    setCurrentTrackMoment(0);
  };

  const handlePlay = () => {
    if (audioPlayer.paused || audioPlayer.ended) {
      audioPlayer.play();
      setIsPlaying(true);
    } else {
      audioPlayer.pause();
      setIsPlaying(false);
    }
  };

  const handleMetadata = () => {
    const duration = Math.floor(audioPlayer.duration);
    setCurrentTrackDuration(getSecondsToMinutesAndSeconds(duration));
  };

  const handleTimeupdate = (playNext) => {
    setCurrentTrackMoment(Math.floor(audioPlayer.currentTime));
    setProgressBarWidth(
      Math.floor((audioPlayer.currentTime / audioPlayer.duration) * 100) + '%'
    );
    if (audioPlayer.currentTime === audioPlayer.duration) {
      playNext();
    }
  };

  useEffect(() => {
    setCurrentTrackDuration(0);
    setCurrentTrackMoment(0);
    setProgressBarWidth('0');
    handlePlay();
  }, [props.url]);

  useLayoutEffect(() => {
    initPlayer();
  });

  return (
    <PlaylistContext.Consumer>
      {(value) => (
        <div key={props.url}>
          <audio
            id="audioPlayer"
            preload="metadata"
            onLoadedMetadata={handleMetadata}
            onTimeUpdate={() => handleTimeupdate(value.handleNextTrack)}
          >
            <source src={props.url} type="audio/ogg" />
            Ooops, your browser is sooo old.
          </audio>
          <div className={classes.container}>
            <IconButton aria-label="previous" onClick={value.handlePrevTrack}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="play/pause" onClick={handlePlay}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton aria-label="next" onClick={value.handleNextTrack}>
              <SkipNextIcon />
            </IconButton>
            <div className={classes.counter}>
              {getSecondsToMinutesAndSeconds(currentTrackMoment)}
            </div>
            <ProgressBar progressPercent={progressBarWidth} width={'200px'} />
            <div className={classes.counter}>
              {currentTrackDuration || '0 : 00'}
            </div>
          </div>
        </div>
      )}
    </PlaylistContext.Consumer>
  );
}
