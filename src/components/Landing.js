import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Divider } from '@material-ui/core';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { makeStyles } from '@material-ui/styles';
import { RichText } from 'components';
import {
  sortedSkillsSelector,
  qualificationSummarySelector,
  filteredSkillsSelector
} from 'store/selectors';

const useStyles = makeStyles({
  topMargin: {
    marginTop: '20px'
  },
  topPadding: {
    paddingTop: '20px'
  },
  paper: {
    height: '100%'
  }
});

export const Landing = () => {
  const summary = useSelector(qualificationSummarySelector);
  const skills = useSelector(sortedSkillsSelector);
  const filteredSkills = useSelector(filteredSkillsSelector);
  const classes = useStyles();
  const data = (filteredSkills.length === 0
    ? skills
    : skills.filter(e => filteredSkills.includes(e.index))
  )
    .slice(-10)
    .map(({ name, duration }) => ({
      name,
      duration
    }));
  return (
    <Paper elevation={0} className={classes.paper}>
      <Container className={classes.topPadding}>
        <Typography variant="h4">Qualification Summary</Typography>
        <RichText
          text={summary}
          variant="body1"
          className={classes.topMargin}
          align="justify"
        />
        <Divider className={classes.topMargin} />
        <Paper elevation={0} className={classes.topPadding}>
          <Typography variant="h4">Top Skills</Typography>
          <Chart data={data} rotated>
            <Animation />
            <ArgumentAxis />
            <ValueAxis showLabels={false} />
            <BarSeries argumentField="name" valueField="duration" />
          </Chart>
        </Paper>
      </Container>
    </Paper>
  );
};
