import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ThemeProvider, AppLoader } from 'components';
import { CssBaseline } from '@material-ui/core';

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <AppLoader />
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
