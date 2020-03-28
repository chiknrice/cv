import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions, cvActions } from 'store';
import { fetchCv } from 'components/cvLoader';
import {
  Container,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '101vh'
  }
});

const { setCv } = cvActions;
const { setFilter } = uiActions;

const loadApp = () => dispatch =>
  fetchCv()
    .then(({ filter, cv }) =>
      Promise.all([dispatch(setCv(cv)), dispatch(setFilter(filter))])
    )
    .then(() => import('./App'));

const Loader = () => {
  const classes = useStyles();

  useEffect(() => {
    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i)
    ) {
      /* iOS hides Safari address bar */
      window.scrollTo(0, 1);
    }
  });

  return (
    <Container className={classes.loaderContainer}>
      <CircularProgress />
    </Container>
  );
};

export const AppLoader = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [LoadedApp, setLoadedApp] = useState(null);
  const [doLoadApp, setDoLoadApp] = useState(true);

  if (doLoadApp) {
    setDoLoadApp(false);
    dispatch(loadApp())
      .then(module => setLoadedApp({ component: module.App }))
      .catch(e => setError(e.message));
  }

  if (LoadedApp) {
    return <LoadedApp.component />;
  } else if (error) {
    return (
      <Dialog open={true}>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setDoLoadApp(true);
              setError(null);
            }}
          >
            Retry
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return <Loader />;
  }
};
