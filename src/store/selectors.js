import { createSelector } from '@reduxjs/toolkit';

const uiSelector = state => state.ui;

const cvSelector = state => state.cv;

const themeOptionsSelector = createSelector(uiSelector, ui => ui.themeOptions);

const personalDetailsSelector = createSelector(cvSelector, cv => ({
  name: cv.name,
  contact: cv.contact,
  address: cv.address
}));

const qualificationSummarySelector = createSelector(
  cvSelector,
  cv => cv.summary
);

const categoriesLookupSelector = createSelector(
  cvSelector,
  cv => cv.categories
);

const skillsLookupSelector = createSelector(cvSelector, cv => cv.skills);

const selectedTimelineElementSelector = createSelector(
  uiSelector,
  ui => ui.selectedTimelineElement
);

const duration = (startDate, endDate) => {
  endDate = endDate ?? new Date();
  const months =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());
  return months;
};

const workExperiencesSelector = createSelector(cvSelector, cv =>
  cv.experience.map((exp, index) => {
    const startDate = new Date(exp.startDate);
    const endDate = exp.endDate ? new Date(exp.endDate) : null;
    return {
      ...exp,
      index,
      startDate,
      endDate,
      duration: duration(startDate, endDate)
    };
  })
);

const workExperiencesSummarySelector = createSelector(
  selectedTimelineElementSelector,
  workExperiencesSelector,
  (selectedTimelineElement, workExperiences) =>
    workExperiences.map(workExperience =>
      (({ index, startDate, endDate, role, company, location, duration }) => ({
        index,
        startDate,
        endDate,
        role,
        company,
        location,
        duration,
        active: selectedTimelineElement === index
      }))(workExperience)
    )
);

const selectedExperienceSelector = createSelector(
  selectedTimelineElementSelector,
  workExperiencesSelector,
  (selectedTimelineElement, workExperiences) =>
    workExperiences[selectedTimelineElement]
);

const skillsByExperienceSelector = createSelector(
  workExperiencesSelector,
  workExperiences =>
    workExperiences.flatMap(workExperience =>
      workExperience.skills.map(skillIndex =>
        (({ index, duration }) => ({
          index: skillIndex,
          experienceIndex: index,
          duration
        }))(workExperience)
      )
    )
);

const skillsTotalDurationSelector = createSelector(
  skillsByExperienceSelector,
  skills => {
    return Object.entries(
      skills.reduceRight((map, skill) => {
        map[skill.index] = skill.duration + (map[skill.index] ?? 0);
        return map;
      }, {})
    )
      .map(([index, duration]) => ({ index, duration }))
      .sort((a, b) => a.duration - b.duration);
  }
);

export {
  themeOptionsSelector,
  categoriesLookupSelector,
  skillsLookupSelector,
  personalDetailsSelector,
  qualificationSummarySelector,
  selectedExperienceSelector,
  workExperiencesSummarySelector,
  skillsByExperienceSelector,
  skillsTotalDurationSelector
};
