import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import yaml from 'js-yaml';
import {
  store,
  cvActions,
  uiActions,
  uiStatusSelector,
  uiErrorSelector
} from 'store';
import { ThemeProvider } from 'components';
import {
  CssBaseline,
  Container,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }
});

const normaliseCv = ({
  meta: { categories, skills },
  education,
  experience,
  ...rest
}) => {
  const categoriesIndex = categories.reduce((obj, e, i) => {
    obj[e] = i;
    return obj;
  }, {});
  const skillsIndex = skills.reduce((obj, e, i) => {
    obj[e.name] = i;
    return obj;
  }, {});
  const normalisedSkills = skills.map(({ name, categories }) => ({
    name,
    categories: categories.map(category => categoriesIndex[category])
  }));
  const normalisedEducation = education.map(educ => {
    const { 'start-year': startYear, 'end-year': endYear, ...rest } = educ;
    return { startYear, endYear, ...rest };
  });
  const normalisedExperiences = experience.map(
    ({ 'start-date': startDate, 'end-date': endDate, skills, ...rest }) => {
      return {
        startDate: startDate.getTime(),
        endDate: endDate?.getTime() ?? null,
        skills: skills.map(skill => skillsIndex[skill]),
        ...rest
      };
    }
  );

  return {
    ...rest,
    education: normalisedEducation,
    experience: normalisedExperiences,
    categories,
    skills: normalisedSkills
  };
};

const loadApp = setApp => {
  const { setCv } = cvActions;
  const { fetchAppRequested, fetchAppSuccess, fetchAppFailed } = uiActions;
  return dispatch => {
    dispatch(fetchAppRequested());
    fetch('cv.yaml')
      .then(response => response.text())
      .then(data => yaml.load(data))
      .then(json => normaliseCv(json))
      .then(loadedCv => {
        dispatch(setCv(loadedCv));
        return import('./App');
      })
      .then(module => {
        setApp({ component: module.App });
        dispatch(fetchAppSuccess());
      })
      .catch(e => {
        dispatch(fetchAppFailed(e.message));
      });
  };
};

const LoadableApp = () => {
  const dispatch = useDispatch();
  const status = useSelector(uiStatusSelector);
  const error = useSelector(uiErrorSelector);
  const [LoadedApp, setLoadedApp] = useState(null);
  const classes = useStyles();

  if (status === 'not-loaded') {
    dispatch(loadApp(setLoadedApp));
  }

  if (status === 'loaded') {
    return <LoadedApp.component />;
  } else if (status === 'error') {
    return (
      <Dialog open={true}>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => dispatch(loadApp(setLoadedApp))}
          >
            Retry
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return (
      <Container className={classes.loaderContainer}>
        <CircularProgress />
      </Container>
    );
  }
};

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <LoadableApp />
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
