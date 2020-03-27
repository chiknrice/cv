import yaml from 'js-yaml';

const duration = (startDate, endDate) => {
  endDate = endDate ?? new Date();
  const months =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());
  return months;
};

const validateDuplicates = (array, nodeName, getKey = undefined) => {
  if (
    array.length !== [...new Set(getKey ? array.map(getKey) : array)].length
  ) {
    throw new Error(`Duplicate entries found in ${nodeName}`);
  }
};

const validateEntriesInKeys = (array, map, mapName) => {
  array.forEach(e => {
    if (map[e] === undefined) {
      throw new Error(`Missing entry ${e} in ${mapName} map`);
    }
  });
};

const normaliseCv = ({
  meta: { categories, skills },
  education,
  experience,
  ...rest
}) => {
  validateDuplicates(categories, 'categories');
  validateDuplicates(skills, 'skills', s => s.name);
  const categoriesIndexLookup = categories.reduce((obj, e, i) => {
    obj[e] = i;
    return obj;
  }, {});
  const skillsIndexLookup = skills.reduce((obj, e, i) => {
    obj[e.name] = i;
    return obj;
  }, {});
  skills.forEach(s => {
    validateDuplicates(s.categories, `skills[${s.name}].categories`);
    validateEntriesInKeys(s.categories, categoriesIndexLookup, 'categories');
  });
  experience.forEach(e => {
    validateDuplicates(e.skills, `eperience[${e.company}].skills`);
    validateEntriesInKeys(e.skills, skillsIndexLookup, 'skills');
  });
  const normalisedEducation = education.map(educ => {
    const { 'start-year': startYear, 'end-year': endYear, ...rest } = educ;
    return { startYear, endYear, ...rest };
  });
  const normalisedExperiences = experience.map(
    ({ 'start-date': startDate, 'end-date': endDate, skills, ...rest }) => {
      return {
        startDate: startDate.getTime(),
        endDate: endDate?.getTime() ?? null,
        skills: skills.map(skill => skillsIndexLookup[skill]),
        duration: duration(startDate, endDate),
        ...rest
      };
    }
  );
  const normalisedSkills = skills.map(({ name, categories }, index) => ({
    index,
    name,
    categories: categories.map(category => categoriesIndexLookup[category]),
    selected: false,
    duration: normalisedExperiences
      .filter(exp => exp.skills.includes(index))
      .map(({ duration }) => duration)
      .reduce((running, cur) => running + cur, 0)
  }));

  return {
    filter: {
      categories,
      skills: normalisedSkills
    },
    cv: {
      ...rest,
      education: normalisedEducation,
      experience: normalisedExperiences
    }
  };
};

export const fetchCv = () =>
  fetch('cv.yaml')
    .then(response => response.text())
    .then(data => yaml.load(data))
    .then(json => {
      if (json.name) {
        return normaliseCv(json);
      } else {
        throw new Error(`Invalid cv data`);
      }
    });
