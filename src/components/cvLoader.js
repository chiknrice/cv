import yaml from 'js-yaml';

const duration = (startDate, endDate) => {
  endDate = endDate ?? new Date();
  const months =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());
  return months;
};

const normaliseCv = ({
  meta: { categories, skills },
  education,
  experience,
  ...rest
}) => {
  const normalisedEducation = education.map(educ => {
    const { 'start-year': startYear, 'end-year': endYear, ...rest } = educ;
    return { startYear, endYear, ...rest };
  });
  const skillsIndex = skills.reduce((obj, e, i) => {
    obj[e.name] = i;
    return obj;
  }, {});
  const normalisedExperiences = experience.map(
    ({ 'start-date': startDate, 'end-date': endDate, skills, ...rest }) => {
      return {
        startDate: startDate.getTime(),
        endDate: endDate?.getTime() ?? null,
        skills: skills.map(skill => skillsIndex[skill]),
        duration: duration(startDate, endDate),
        ...rest
      };
    }
  );
  const categoriesIndexLookup = categories.reduce((obj, e, i) => {
    obj[e] = i;
    return obj;
  }, {});
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

  return [
    {
      categories: categories.map(category => ({
        name: category,
        selected: false
      })),
      skills: normalisedSkills
    },
    {
      ...rest,
      education: normalisedEducation,
      experience: normalisedExperiences
    }
  ];
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
