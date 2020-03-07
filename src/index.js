import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import yaml from 'js-yaml';
import { store, cvActions } from './store';
import { ThemeProvider } from './components/ThemeProvider';
import Loadable from 'react-loadable';
import { CssBaseline, Container, CircularProgress } from '@material-ui/core';
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
};

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
    store.dispatch(cvActions.setCv(loaded.cv));
    return <loaded.module.App />;
  }
});

const Root = props => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LoadableApp />
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
