import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider, CssBaseline, Container } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors';
import { Header, Timeline } from './components';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  }
});

const styles = theme => ({
  appContainer: {
    backgroundColor: theme.palette.grey[100]
  }
});

const mapStateToProps = state => ({ ...state });

export const App = connect(mapStateToProps)(
  withStyles(styles)(({ cv, classes }) => {
    if (cv.loading) {
      throw new Error('App can only be rendered with a loaded cv');
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container className={classes.appContainer}>
          <Header />
          <Timeline />
        </Container>
      </ThemeProvider>
    );
  })
);
