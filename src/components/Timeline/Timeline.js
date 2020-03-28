import React from 'react';
import { Stepper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { uiActions } from 'store';
import { workExperiencesSummarySelector } from 'store/selectors';
import { WorkExperience } from './WorkExperience';

const useStyles = makeStyles(theme => ({
  timeline: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      padding: '12px'
    }
  }
}));

export const Timeline = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const experiences = useSelector(workExperiencesSummarySelector);
  // splitting out active prop here actually tells WorkExperience to re-render due to change in prop
  const timelineElements = experiences.map(({ active, ...rest }) => (
    <WorkExperience
      key={rest.startDate}
      experience={rest}
      active={active}
      handleClick={index =>
        dispatch(uiActions.setSelectedTimelineElement(index))
      }
    />
  ));

  return (
    <Stepper
      orientation="vertical"
      nonLinear={true}
      className={classes.timeline}
    >
      {timelineElements}
    </Stepper>
  );
});
