import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
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
