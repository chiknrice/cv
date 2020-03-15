import React from 'react';
import { Container } from '@material-ui/core';
import { Header, Landing, Timeline } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  bodyContainer: {
    flexGrow: 1
  }
});

export const App = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container} disableGutters>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact={true}>
            <Landing className={classes.bodyContainer} />
          </Route>
          <Route path="/timeline">
            <Timeline className={classes.bodyContainer} />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};
