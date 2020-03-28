import React from 'react';
import { Typography, Step, StepLabel, StepContent } from '@material-ui/core';
import { Work } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { workExperiencesSelector } from 'store/selectors';
import { WorkExperienceDetail } from './WorkExperienceDetail';

const WorkIcon = ({ active }) => {
  return <Work color={active ? 'primary' : 'disabled'} />;
};

export const WorkExperience = ({
  experience: { index, startDate, endDate, role, company, location, duration },
  active,
  handleClick,
  ...stepProps
}) => {
  const workExperiences = useSelector(workExperiencesSelector);
  const label = (
    <Typography
      variant={active ? 'h6' : 'subtitle1'}
    >{`${company} (${location}) - ${role}`}</Typography>
  );
  const caption = (
    <Typography
      variant={active ? 'subtitle1' : 'subtitle2'}
      color="textSecondary"
    >{`${startDate.toLocaleDateString()} - ${endDate?.toLocaleDateString() ||
      'Present'} (${duration > 12 ? 'Years' : 'Months'})`}</Typography>
  );

  const labelRef = React.createRef();

  const scrollToTitle = () =>
    labelRef.current.scrollIntoView({
      behavior: 'smooth'
    });

  return (
    <Step
      active={active}
      completed={false}
      onClick={() => !active && handleClick(index)}
      {...stepProps}
    >
      <StepLabel
        StepIconComponent={WorkIcon}
        StepIconProps={{ active }}
        optional={caption}
        ref={labelRef}
      >
        {label}
      </StepLabel>
      <StepContent TransitionProps={{ onEntered: scrollToTitle }}>
        {active ? <WorkExperienceDetail {...workExperiences[index]} /> : null}
      </StepContent>
    </Step>
  );
};
