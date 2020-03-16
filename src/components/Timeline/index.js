import React, { useEffect } from 'react';
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { Work } from '@material-ui/icons';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { makeStyles } from '@material-ui/styles';
import { uiActions } from 'store';
import { RichText } from 'components';

const useStyles = makeStyles({
  timeline: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '100%'
  }
});

const uiSelector = state => state.ui;

const selectedTimelineElementSelector = createSelector(
  uiSelector,
  ui => ui.selectedTimelineElement
);

const cvSelector = state => state.cv;

const workExperiencesSelector = createSelector(cvSelector, cv => cv.experience);

const workExperiencesSummarySelector = createSelector(
  selectedTimelineElementSelector,
  workExperiencesSelector,
  (selectedTimelineElement, workExperiences) =>
    workExperiences.map((workExperience, index) => ({
      index,
      active: selectedTimelineElement === index,
      startDate: new Date(workExperience['start-date']),
      endDate: workExperience['end-date']
        ? new Date(workExperience['end-date'])
        : null,
      role: workExperience.role,
      company: workExperience.company,
      location: workExperience.location
    }))
);

const selectedDateExperienceSelector = createSelector(
  selectedTimelineElementSelector,
  workExperiencesSelector,
  (selectedTimelineElement, workExperiences) =>
    workExperiences[selectedTimelineElement]
);

const mapDispatchToProps = dispatch => ({
  handleExperienceClick: index =>
    dispatch(uiActions.setSelectedTimelineElement(index))
});

const mapStateToProps = state => ({
  selectedTimelineElement: selectedDateExperienceSelector(state),
  experiences: workExperiencesSummarySelector(state)
});

const WorkIcon = ({ active }) => {
  return <Work color={active ? 'primary' : 'disabled'} />;
};

const duration = (startDate, endDate) => {
  endDate = endDate || new Date();
  const months =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());
  return months > 12 ? 'Years' : 'Months';
};

const WorkExperience = props => {
  const { experience, active, details, handleClick, ...stepProps } = props;
  const { index, startDate, endDate, role, company, location } = experience;
  const label = (
    <Typography
      variant={active ? 'h6' : 'subtitle1'}
    >{`${company} (${location}) - ${role}`}</Typography>
  );
  const caption = (
    <Typography
      variant={active ? 'subtitle1' : 'subtitle2'}
      color="textSecondary"
    >{`${startDate.toLocaleDateString()} - ${endDate?.toLocaleDateString() ||
      'Present'} (${duration(startDate, endDate)})`}</Typography>
  );

  const ref = React.createRef();
  useEffect(() => {
    if (active) {
      ref.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });

  return (
    <Step
      active={active}
      completed={false}
      onClick={() => !active && handleClick(index)}
      {...stepProps}
    >
      <StepLabel
        StepIconComponent={WorkIcon}
        StepIconProps={{ active }}
        optional={caption}
        ref={ref}
      >
        {label}
      </StepLabel>
      <StepContent>{details}</StepContent>
    </Step>
  );
};

const Projects = ({ projects }) => {
  const projectListItems = projects.map(project => (
    <ListItem key={project.title}>
      <ListItemText
        disableTypography={true}
        primary={<Typography variant="body1">{project.title}</Typography>}
        secondary={
          <>
            <RichText
              text={project.description}
              variant="body2"
              color="textSecondary"
            />
          </>
        }
      />
    </ListItem>
  ));
  return <List>{projectListItems}</List>;
};

export const Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ selectedTimelineElement, experiences, handleExperienceClick }) => {
  const timelineElements = experiences.map(experience => {
    const { active, startDate } = experience;
    const details =
      active && selectedTimelineElement.projects ? (
        <Projects projects={selectedTimelineElement.projects} />
      ) : null;
    return (
      <WorkExperience
        key={startDate}
        experience={experience}
        active={active}
        details={details}
        handleClick={handleExperienceClick}
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
});
