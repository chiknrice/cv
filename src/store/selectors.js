import { createSelector } from '@reduxjs/toolkit';

const uiSelector = state => state.ui;

const cvSelector = state => state.cv;

const themeOptionsSelector = createSelector(uiSelector, ui => ui.themeOptions);

const filtersSelector = createSelector(uiSelector, ui => ui.filters);

const filterDrawerVisibleSelector = createSelector(
  filtersSelector,
  filters => filters.drawerVisible
);

const categoriesLookupSelector = createSelector(
  filtersSelector,
  filters => filters.categories
);

const skillsLookupSelector = createSelector(
  filtersSelector,
  filters => filters.skills
);

const selectedSkillsSelector = createSelector(skillsLookupSelector, skills =>
  skills.reduce((container, skill, index) => {
    if (skill.selected) container.push(index);
    return container;
  }, [])
);

const selectedCategoriesSelector = createSelector(
  categoriesLookupSelector,
  categories =>
    categories.reduce((container, category, index) => {
      if (category.selected) container.push(index);
      return container;
    }, [])
);

const personalDetailsSelector = createSelector(cvSelector, cv => ({
  name: cv.name,
  shortName: cv['short-name'],
  contact: cv.contact,
  address: cv.address
}));

const qualificationSummarySelector = createSelector(
  cvSelector,
  cv => cv.summary
);

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
  filterDrawerVisibleSelector,
  categoriesLookupSelector,
  selectedCategoriesSelector,
  skillsLookupSelector,
  selectedSkillsSelector,
  personalDetailsSelector,
  qualificationSummarySelector,
  selectedExperienceSelector,
  workExperiencesSummarySelector,
  skillsByExperienceSelector,
  skillsTotalDurationSelector
};
