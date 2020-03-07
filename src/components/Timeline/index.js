import React from 'react';
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
import { uiActions } from '../../store';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  timeline: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '100%'
  }
});

const uiSelector = state => state.ui;

const selectedDateSelector = createSelector(uiSelector, ui => ui.selectedDate);

const cvSelector = state => state.cv;

const workExperiencesSelector = createSelector(cvSelector, cv => cv.experience);

const workExperiencesSummarySelector = createSelector(
  workExperiencesSelector,
  workExperiences =>
    workExperiences.map(workExperience => ({
      startDate: workExperience['start-date'],
      endDate: workExperience['end-date'] ?? 'Present',
      role: workExperience.role,
      company: workExperience.company,
      location: workExperience.location
    }))
);

const selectedDateExperienceSelector = createSelector(
  selectedDateSelector,
  workExperiencesSelector,
  (selectedDate, workExperiences) =>
    selectedDate === 'first'
      ? workExperiences[0]
      : workExperiences.find(
          workExperience => workExperience['start-date'] === selectedDate
        )
);

const mapDispatchToProps = dispatch => ({
  handleExperienceClick: date => dispatch(uiActions.setSelectedDate(date))
});

const mapStateToProps = state => ({
  selectedTimelineElement: selectedDateExperienceSelector(state),
  experiences: workExperiencesSummarySelector(state)
});

const WorkIcon = ({ active }) => {
  return <Work color={active ? 'primary' : 'disabled'} />;
};

const WorkExperience = ({ experience, active, details, handleClick }) => {
  const { startDate, endDate, role, company, location } = experience;
  const label = (
    <Typography
      variant={active ? 'h6' : 'subtitle1'}
    >{`${company} (${location}) - ${role}`}</Typography>
  );
  const caption = (
    <Typography
      variant={active ? 'subtitle1' : 'subtitle2'}
      color={active ? 'textPrimary' : 'textSecondary'}
    >{`${startDate} - ${endDate}`}</Typography>
  );
  return (
    <Step
      key={startDate}
      active={active}
      completed={false}
      onClick={() => handleClick(startDate)}
    >
      <StepLabel
        StepIconComponent={WorkIcon}
        StepIconProps={{ active }}
        optional={caption}
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
        primary={project.title}
        primaryTypographyProps={{ variant: 'body1' }}
        secondary={project.description}
        secondaryTypographyProps={{ variant: 'body2' }}
      />
    </ListItem>
  ));
  return <List>{projectListItems}</List>;
};

export const Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ selectedTimelineElement, experiences, handleExperienceClick }) => {
  const selectedDate = selectedTimelineElement['start-date'];
  const timelineElements = experiences.map(experience => {
    const active = experience.startDate === selectedDate;
    const details =
      active && selectedTimelineElement.projects ? (
        <Projects projects={selectedTimelineElement.projects} />
      ) : null;
    return (
      <WorkExperience
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
