import React from 'react';
import { Container } from '@material-ui/core';
import { Header, Landing, Timeline, SkillsFilter } from 'components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { filterDrawerVisibleSelector } from 'store/selectors';

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
  const filterDrawerVisible = useSelector(filterDrawerVisibleSelector);
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
        <SkillsFilter visible={filterDrawerVisible} />
      </Router>
    </Container>
  );
};
