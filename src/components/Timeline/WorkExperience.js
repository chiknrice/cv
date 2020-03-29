import React from 'react';
import {
  Typography,
  Step,
  StepLabel,
  StepContent,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
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
  const theme = useTheme();
  const useLong = useMediaQuery(theme.breakpoints.up('sm'));
  const workExperiences = useSelector(workExperiencesSelector);
  const label = useLong ? (
    <Typography variant="subtitle1">{`${company} (${location}) - ${role}`}</Typography>
  ) : (
    <>
      <Typography variant="subtitle1">{`${company} (${location})`}</Typography>
      <Typography variant="subtitle2">{role}</Typography>
    </>
  );
  const caption = (
    <Typography
      variant="subtitle2"
      color="textSecondary"
    >{`${startDate.toLocaleDateString()} - ${endDate?.toLocaleDateString() ||
      'Present'} (${duration > 12 ? 'Years' : 'Months'})`}</Typography>
  );

  const labelRef = React.createRef();

  const scrollToTitle = () => {
    const ios =
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i);
    labelRef.current.scrollIntoView({
      behavior: 'smooth',
      block: ios ? 'nearest' : 'start'
    });
  };

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
