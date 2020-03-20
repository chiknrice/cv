import React from 'react';
import { Stepper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { uiActions } from 'store';
import {
  selectedExperienceSelector,
  workExperiencesSummarySelector
} from 'store';
import { WorkExperience } from './WorkExperience';
import { WorkExperienceDetail } from './WorkExperienceDetail';

const useStyles = makeStyles({
  timeline: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '100%'
  }
});

export const Timeline = () => {
  const dispatch = useDispatch();
  const selectedTimelineElement = useSelector(selectedExperienceSelector);
  const experiences = useSelector(workExperiencesSummarySelector);
  const timelineElements = experiences.map(experience => {
    const { active, startDate } = experience;
    const details =
      active && selectedTimelineElement.projects ? (
        <WorkExperienceDetail {...selectedTimelineElement} />
      ) : null;
    return (
      <WorkExperience
        key={startDate}
        experience={experience}
        active={active}
        details={details}
        handleClick={index =>
          dispatch(uiActions.setSelectedTimelineElement(index))
        }
      />
    );
  });

  const classes = useStyles();

  return (
    <Stepper
      orientation="vertical"
      nonLinear={true}
      className={classes.timeline}
    >
      {timelineElements}
    </Stepper>
  );
};
