import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import yaml from 'js-yaml';
import { store, cvActions } from './store';
import { ThemeProvider } from './components/ThemeProvider';
import Loadable from 'react-loadable';
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

const Loading = ({ error, retry }) => {
  const classes = useStyles();
  return (
    <Container className={classes.loaderContainer}>
      {error ? (
        <Dialog open={true} onClose={retry}>
          <DialogContent>Error loading CV</DialogContent>
          <DialogActions>
            <Button color="primary" onClick={retry}>
              Retry
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

const LoadableApp = Loadable.Map({
  loader: {
    module: () => import('./App'),
    cv: () =>
      fetch('cv.yaml')
        .then(response => response.text())
        .then(data => yaml.load(data))
        .error(e => console.error(e))
  },
  loading: Loading,
  render(loaded, _) {
    store.dispatch(cvActions.setCv(loaded.cv));
    return <loaded.module.App />;
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
