import { createSelector } from '@reduxjs/toolkit';

const uiSelector = state => state.ui;

const cvSelector = state => state.cv;

const themeOptionsSelector = createSelector(uiSelector, ui => ui.themeOptions);

const filterSelector = createSelector(uiSelector, ui => ui.filter);

const selectedTimelineElementSelector = createSelector(
  uiSelector,
  ui => ui.selectedTimelineElement
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

/**
 * Adds index and converts the start and end dates to actual dates
 * as the dates are not serializable for storing in redux
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

/**
 * Flag to show the filter drawer
 */
const filterDrawerVisibleSelector = createSelector(
  filterSelector,
  filter => filter.drawerVisible
);

/**
 * Lookup for the skill (by array index) which contains the skill name and selected flag
 */
const skillsLookupSelector = createSelector(
  filterSelector,
  filter => filter.skills
);

/**
 * Lookup for the category (by array index) which also serves as lookup of skills under
 * a category
 */
const categoriesLookupSelector = createSelector(
  filterSelector,
  skillsLookupSelector,
  (filter, skills) =>
    filter.categories.map((category, index) => ({
      name: category,
      skills: skills
        .filter(skill => skill.categories.includes(index))
        .map(({ index }) => index)
    }))
);

/**
 * Collects all skill indexes which are selected for filtering
 */
const selectedSkillsSelector = createSelector(skillsLookupSelector, skills =>
  skills.filter(skill => skill.selected).map(({ index }) => index)
);

/**
 * Collects all skill indexes used in the experiences for limiting displayed skills in
 * skills drop down in filter drawer
 */
const usedSkillsSelector = createSelector(
  workExperiencesSelector,
  workExperiences => [
    ...new Set(workExperiences.flatMap(({ skills }) => skills))
  ]
);

/**
 * Collects all category indexes which are effectively used by the used skills
 * (@see usedSkillsSelector) for limiting displayed categories in the categories
 * drop down in filter drawer
 */
const usedCategoriesSelector = createSelector(
  usedSkillsSelector,
  skillsLookupSelector,
  (usedSkills, skills) => {
    const categories = skills
      .filter((skill, index) => usedSkills.includes(index))
      .flatMap(({ categories }) => categories);
    return [...new Set(categories)];
  }
);

/**
 * Unlike skillsLookup, the position of the element does not represent the lookup position of the skill,
 * also, the skills included in the sorted skills are only used ones
 */
const sortedSkillsSelector = createSelector(
  skillsLookupSelector,
  usedSkillsSelector,
  (skills, usedSkills) =>
    skills
      .filter(({ index }) => usedSkills.includes(index))
      .sort((a, b) => a.duration - b.duration)
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

/**
 * Collects the top 10 skills either filtered or from the
 */
const topSkillsSelector = createSelector(
  sortedSkillsSelector,
  selectedSkillsSelector,
  (sortedSkills, selectedSkills) =>
    (selectedSkills.length > 0
      ? sortedSkills.filter(skill => skill.selected)
      : sortedSkills
    )
      .slice(-10)
      .map(({ name, duration }) => ({
        name,
        duration
      }))
);

export {
  themeOptionsSelector,
  filterDrawerVisibleSelector,
  categoriesLookupSelector,
  skillsLookupSelector,
  usedCategoriesSelector,
  usedSkillsSelector,
  selectedSkillsSelector,
  sortedSkillsSelector,
  topSkillsSelector,
  personalDetailsSelector,
  qualificationSummarySelector,
  workExperiencesSelector,
  workExperiencesSummarySelector
};
