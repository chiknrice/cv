import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ThemeProvider, AppLoader } from 'components';
import { CssBaseline } from '@material-ui/core';

/* iOS re-orientation fix */
if (
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i)
) {
  /* iOS hides Safari address bar */
  window.addEventListener('load', function() {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 1000);
  });
}

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
