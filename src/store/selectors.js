import { createSelector } from '@reduxjs/toolkit';

const uiSelector = state => state.ui;

const cvSelector = state => state.cv;

export const uiStatusSelector = createSelector(uiSelector, ui => ui.status);

export const uiErrorSelector = createSelector(uiSelector, ui => ui.error);

export const themeOptionsSelector = createSelector(
  uiSelector,
  ui => ui.themeOptions
);

export const personalDetailsSelector = createSelector(cvSelector, cv => ({
  name: cv.name,
  contact: cv.contact,
  address: cv.address
}));

export const qualificationSummarySelector = createSelector(
  cvSelector,
  cv => cv.summary
);

const selectedTimelineElementSelector = createSelector(
  uiSelector,
  ui => ui.selectedTimelineElement
);

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
