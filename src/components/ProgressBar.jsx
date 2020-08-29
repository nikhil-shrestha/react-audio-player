import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: ({ width }) => ({
    position: 'relative',
    height: ' 4px',
    width: `calc(${width || '100%'} - 15px)`,
    backgroundColor: '#c9bbdc',
    borderRadius: '5px',
  }),
  point: ({ progressPercent }) => ({
    position: 'absolute',
    left: progressPercent,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    bottom: '10px',
    height: '8px',
    width: '8px',
    backgroundColor: '#7364a9',
    borderRadius: '50%',
  }),
  progress: ({ progressPercent }) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: '10px',
    height: 'inherit',
    width: progressPercent,
    backgroundColor: '#7364a9',
    borderRadius: '5px',
  }),
}));

export function ProgressBar(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <div className={classes.point} />
      <div className={classes.progress} />
    </div>
  );
}

ProgressBar.propTypes = {
  progressPercent: PropTypes.string,
  width: PropTypes.string,
};
