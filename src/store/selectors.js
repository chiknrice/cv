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

const selectedCategoriesSelector = createSelector(
  categoriesLookupSelector,
  categories =>
    categories.reduce((container, category, index) => {
      if (category.selected) container.push(index);
      return container;
    }, [])
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

/**
 * Unlike skillsLookup, the position of the element does not represent the lookup position of the skill
 */
const sortedSkillsSelector = createSelector(skillsLookupSelector, skills =>
  [...skills].sort((a, b) => a.duration - b.duration)
);

const filteredSkillsSelector = createSelector(
  skillsLookupSelector,
  selectedSkillsSelector,
  selectedCategoriesSelector,
  (skills, selectedSkills, selectedCategories) =>
    skills
      .filter(
        (skill, index) =>
          selectedSkills.includes(index) ||
          skill.categories.filter(category =>
            selectedCategories.includes(category)
          ).length > 0
      )
      .map(skill => skill.index)
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

/**
 * Adds index and converts the start and end dates to actual dates
 */
const workExperiencesSelector = createSelector(cvSelector, cv =>
  cv.experience.map((exp, index) => {
    const startDate = new Date(exp.startDate);
    const endDate = exp.endDate ? new Date(exp.endDate) : null;
    return {
      ...exp,
      index,
      startDate,
      endDate
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

export {
  themeOptionsSelector,
  filterDrawerVisibleSelector,
  categoriesLookupSelector,
  selectedCategoriesSelector,
  skillsLookupSelector,
  selectedSkillsSelector,
  sortedSkillsSelector,
  filteredSkillsSelector,
  personalDetailsSelector,
  qualificationSummarySelector,
  selectedExperienceSelector,
  workExperiencesSummarySelector
};
