import React from 'react';
import { Typography } from '@material-ui/core';
import { Work, School } from '@material-ui/icons';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const workExperiencesSelector = state => state.cv.experience;
const workExperienceSummarySelector = createSelector(
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

const mapStateToProps = state => ({
  experiences: workExperienceSummarySelector(state)
});

export const Timeline = connect(mapStateToProps)(
  withTheme(props => {
    const timelineElements = props.experiences.map(experience => {
      const { primary } = props.theme.palette;
      const elementProps = {
        key: experience.startDate,
        date: `${experience.startDate} - ${experience.endDate}`,
        iconStyle: { background: primary.main, color: primary.contrastText },
        icon: <Work />
      };
      return (
        <VerticalTimelineElement {...elementProps}>
          <Typography variant="h6">{experience.role}</Typography>
          <Typography variant="subtitle1">{experience.company}</Typography>
        </VerticalTimelineElement>
      );
    });
    return (
      <VerticalTimeline layout="1-column">{timelineElements}</VerticalTimeline>
    );
  })
);
