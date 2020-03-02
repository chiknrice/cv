import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import yaml from 'js-yaml';
import { store, cvSlice } from './store';
import Loadable from 'react-loadable';
import { CssBaseline, Container, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }
});

const Loading = withStyles(styles)(({ error, retry, classes }) => {
  if (error) {
    return (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    );
  } else {
    return (
      <Container className={classes.loaderContainer}>
        <CssBaseline />
        <CircularProgress />
      </Container>
    );
  }
});

const LoadableApp = Loadable.Map({
  loader: {
    module: () => import('./App'),
    cv: () =>
      fetch('cv.yaml')
        .then(response => response.text())
        .then(data => yaml.load(data))
  },
  loading: Loading,
  render(loaded, _) {
    store.dispatch(cvSlice.actions.setCv(loaded.cv));
    return (
      <Provider store={store}>
        <loaded.module.App />
      </Provider>
    );
  }
});

ReactDOM.render(<LoadableApp />, document.getElementById('root'));
