import React from 'react';
import {
  Box,
  Chip,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RichText } from 'components';
import { useSelector } from 'react-redux';
import { skillsLookupSelector } from 'store/selectors';

export const Projects = ({ projects }) => {
  const projectListItems = projects.map(project => (
    <ListItem key={project.title} disableGutters>
      <ListItemText
        disableTypography={true}
        primary={<Typography variant="subtitle2">{project.title}</Typography>}
        secondary={
          <>
            <RichText
              text={project.description}
              variant="body2"
              color="textSecondary"
            />
          </>
        }
      />
    </ListItem>
  ));
  return <List>{projectListItems}</List>;
};

const useStyles = makeStyles(theme => ({
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}));

export const WorkExperienceDetail = ({ index, skills, projects }) => {
  const classes = useStyles();
  const skillsLookup = useSelector(skillsLookupSelector);
  return (
    <>
      <Box className={classes.skills}>
        {skills
          .map(skillIndex => skillsLookup[skillIndex])
          .map(({ index, name, selected }) => (
            <Chip
              key={index}
              size="small"
              variant={selected ? 'default' : 'outlined'}
              color={selected ? 'secondary' : 'default'}
              label={name}
            />
          ))}
      </Box>
      <Projects projects={projects} />
    </>
  );
};
