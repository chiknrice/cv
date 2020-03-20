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

export const Projects = ({ projects }) => {
  const projectListItems = projects.map(project => (
    <ListItem key={project.title}>
      <ListItemText
        disableTypography={true}
        primary={<Typography variant="body1">{project.title}</Typography>}
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

export const WorkExperienceDetail = ({ skills, projects }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.skills}>
        {skills.map(skill => (
          <Chip
            key={skill}
            size="small"
            variant="outlined"
            label={skill}
            onClick={() => {}}
          />
        ))}
      </Box>
      <Projects projects={projects} />
    </>
  );
};
