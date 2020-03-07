import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import yaml from 'js-yaml';
import { store, cvActions } from './store';
import Loadable from 'react-loadable';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  CircularProgress,
  createMuiTheme
} from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
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
      <ThemeProvider theme={theme}>
        <Container className={classes.loaderContainer}>
          <CssBaseline />
          <CircularProgress />
        </Container>
      </ThemeProvider>
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
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <loaded.module.App />
        </ThemeProvider>
      </Provider>
    );
  }
});

ReactDOM.render(<LoadableApp />, document.getElementById('root'));
