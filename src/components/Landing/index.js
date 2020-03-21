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
  skillsLookupSelector,
  qualificationSummarySelector,
  skillsTotalDurationSelector
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
  const skillsLookup = useSelector(skillsLookupSelector);
  const skillsByDuration = useSelector(skillsTotalDurationSelector);
  const classes = useStyles();
  const data = skillsByDuration.slice(-10).map(({ index, duration }) => ({
    duration,
    name: skillsLookup[index].name
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
