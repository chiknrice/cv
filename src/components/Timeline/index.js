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

const selectedDateProjectsSelector = createSelector(
  selectedDateSelector,
  workExperiencesSelector,
  (selectedDate, workExperiences) => {
    const found = workExperiences.find(
      workExperience => workExperience['start-date'] === selectedDate
    );
    return found ? found.projects : null;
  }
);

const mapDispatchToProps = dispatch => ({
  selectDate: date => dispatch(uiActions.setSelectedDate(date))
});

const mapStateToProps = state => ({
  selectedDate: selectedDateSelector(state),
  selectedDateProjects: selectedDateProjectsSelector(state),
  experiences: workExperiencesSummarySelector(state)
});

const WorkIcon = ({ active }) => {
  return <Work color={active ? 'primary' : 'disabled'} />;
};

export const Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ selectedDate, selectedDateProjects, experiences, selectDate }) => {
  const timelineElements = experiences.map(
    ({ startDate, endDate, role, company, location }) => {
      const active = startDate === selectedDate;
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
      const listItems =
        active && selectedDateProjects
          ? selectedDateProjects.map(project => (
              <ListItem key={project.title}>
                <ListItemText
                  primary={project.title}
                  primaryTypographyProps={{ variant: 'body1' }}
                  secondary={project.description}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))
          : null;
      const content = listItems ? <List>{listItems}</List> : null;

      return (
        <Step
          key={startDate}
          active={active}
          completed={false}
          onClick={() => selectDate(startDate)}
        >
          <StepLabel
            StepIconComponent={WorkIcon}
            StepIconProps={{ active }}
            optional={caption}
          >
            {label}
          </StepLabel>
          <StepContent>{content}</StepContent>
        </Step>
      );
    }
  );
  return (
    <Stepper orientation="vertical" nonLinear={true}>
      {timelineElements}
    </Stepper>
  );
});
