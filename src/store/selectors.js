import { createSelector } from '@reduxjs/toolkit';

const uiSelector = state => state.ui;

const cvSelector = state => state.cv;

const uiStatusSelector = createSelector(uiSelector, ui => ui.status);

const uiErrorSelector = createSelector(uiSelector, ui => ui.error);

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

const categoriesSelector = createSelector(cvSelector, cv => cv.categories);

const skillsSelector = createSelector(cvSelector, cv => cv.skills);

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
      workExperience.skills.map(skill =>
        (({ index, duration }) => ({ index, duration, name: skill }))(
          workExperience
        )
      )
    )
);

const skillsTotalDurationSelector = createSelector(
  skillsSelector,
  skillsByExperienceSelector,
  (skillIndex, skills) => {
    return Object.entries(
      skills.reduceRight((map, skill) => {
        map[skill.name] = skill.duration + (map[skill.name] ?? 0);
        return map;
      }, {})
    )
      .map(([skill, duration]) => ({ skill: skillIndex[skill].name, duration }))
      .sort((a, b) => a.duration - b.duration);
  }
);

export {
  uiStatusSelector,
  uiErrorSelector,
  themeOptionsSelector,
  skillsSelector,
  categoriesSelector,
  personalDetailsSelector,
  qualificationSummarySelector,
  selectedExperienceSelector,
  workExperiencesSummarySelector,
  skillsByExperienceSelector,
  skillsTotalDurationSelector
};
