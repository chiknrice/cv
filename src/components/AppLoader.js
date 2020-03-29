import React, { useState } from 'react';
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
    height: '100vh'
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

export const AppLoader = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
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
    return (
      <Container className={classes.loaderContainer}>
        <CircularProgress />
      </Container>
    );
  }
};
