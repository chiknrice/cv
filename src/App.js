import React from 'react';
import { connect } from 'react-redux';
import { CssBaseline, Container } from '@material-ui/core';
import { Header, Timeline } from './components';

const mapStateToProps = state => ({ ...state });

export const App = connect(mapStateToProps)(({ cv }) => {
  if (cv.loading) {
    throw new Error('App can only be rendered with a loaded cv');
  }
  // const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Header />
        <Timeline />
      </Container>
    </>
  );
});
