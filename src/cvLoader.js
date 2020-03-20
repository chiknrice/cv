import yaml from 'js-yaml';

const normaliseCv = ({
  meta: { categories, skills },
  education,
  experience,
  ...rest
}) => {
  const categoriesIndex = categories.reduce((obj, e, i) => {
    obj[e] = i;
    return obj;
  }, {});
  const skillsIndex = skills.reduce((obj, e, i) => {
    obj[e.name] = i;
    return obj;
  }, {});
  const normalisedSkills = skills.map(({ name, categories }) => ({
    name,
    categories: categories.map(category => categoriesIndex[category])
  }));
  const normalisedEducation = education.map(educ => {
    const { 'start-year': startYear, 'end-year': endYear, ...rest } = educ;
    return { startYear, endYear, ...rest };
  });
  const normalisedExperiences = experience.map(
    ({ 'start-date': startDate, 'end-date': endDate, skills, ...rest }) => {
      return {
        startDate: startDate.getTime(),
        endDate: endDate?.getTime() ?? null,
        skills: skills.map(skill => skillsIndex[skill]),
        ...rest
      };
    }
  );

  return {
    ...rest,
    education: normalisedEducation,
    experience: normalisedExperiences,
    categories,
    skills: normalisedSkills
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
