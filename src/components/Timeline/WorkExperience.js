import React from 'react';
import { Typography, Step, StepLabel, StepContent } from '@material-ui/core';
import { Work } from '@material-ui/icons';

const WorkIcon = ({ active }) => {
  return <Work color={active ? 'primary' : 'disabled'} />;
};

const duration = (startDate, endDate) => {
  endDate = endDate || new Date();
  const months =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());
  return months > 12 ? 'Years' : 'Months';
};

export const WorkExperience = props => {
  const { experience, active, details, handleClick, ...stepProps } = props;
  const { index, startDate, endDate, role, company, location } = experience;
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
      'Present'} (${duration(startDate, endDate)})`}</Typography>
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
        {details}
      </StepContent>
    </Step>
  );
};
