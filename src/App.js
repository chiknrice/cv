import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import { Header, Landing, Timeline } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const mapStateToProps = state => ({ ...state });

export const App = connect(mapStateToProps)(({ cv }) => {
  if (cv.loading) {
    throw new Error('App can only be rendered with a loaded cv');
  }
  // const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact={true}>
            <Landing />
          </Route>
          <Route path="/timeline">
            <Timeline />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
});
