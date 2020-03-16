import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider, useDispatch } from 'react-redux';
import yaml from 'js-yaml';
import { store, cvActions, uiActions } from 'store';
import { ThemeProvider } from 'components';
import {
  CssBaseline,
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

const mapStateToProps = state => ({ ...state });

const loadApp = setApp => {
  const { setCv } = cvActions;
  const { fetchAppRequested, fetchAppSuccess, fetchAppFailed } = uiActions;
  return dispatch => {
    dispatch(fetchAppRequested());
    fetch('cv.yaml')
      .then(response => response.text())
      .then(data => yaml.load(data))
      .then(loadedCv => {
        dispatch(setCv(loadedCv));
        return import('./App');
      })
      .then(module => {
        setApp({ component: module.App });
        dispatch(fetchAppSuccess());
      })
      .catch(e => {
        dispatch(fetchAppFailed(e.message));
      });
  };
};

const LoadableApp = connect(mapStateToProps)(({ cv, ui }) => {
  const dispatch = useDispatch();
  const [LoadedApp, setLoadedApp] = useState(null);
  const classes = useStyles();

  if (ui.status === 'not-loaded') {
    dispatch(loadApp(setLoadedApp));
  }

  if (ui.status === 'loaded') {
    return <LoadedApp.component />;
  } else if (ui.status === 'error') {
    return (
      <Dialog open={true}>
        <DialogContent>{ui.error}</DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => dispatch(loadApp(setLoadedApp))}
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
});

const Root = props => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <LoadableApp />
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
