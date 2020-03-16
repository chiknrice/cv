import { createSelector } from '@reduxjs/toolkit';

const uiSelector = state => state.ui;

const selectedTimelineElementSelector = createSelector(
  uiSelector,
  ui => ui.selectedTimelineElement
);

const cvSelector = state => state.cv;

const workExperiencesSelector = createSelector(cvSelector, cv => cv.experience);

export const workExperiencesSummarySelector = createSelector(
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

export const selectedExperienceSelector = createSelector(
  selectedTimelineElementSelector,
  workExperiencesSelector,
  (selectedTimelineElement, workExperiences) =>
    workExperiences[selectedTimelineElement]
);
