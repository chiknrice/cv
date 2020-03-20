import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Divider } from '@material-ui/core';
import {
  Chart,
  Title,
  ArgumentAxis,
  ValueAxis,
  BarSeries
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { makeStyles } from '@material-ui/styles';
import { RichText } from 'components';
import {
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
  const skillsByDuration = useSelector(skillsTotalDurationSelector);
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Container className={classes.topPadding}>
        <Typography variant="h4">Qualification Summary</Typography>
        <Divider className={classes.topMargin} />
        <RichText
          text={summary}
          variant="body1"
          className={classes.topMargin}
          align="justify"
        />
        <Paper elevation={0}>
          <Chart data={skillsByDuration.slice(-10)} rotated>
            <Title text="Skills" />
            <Animation />
            <ArgumentAxis />
            <ValueAxis showLabels={false} />
            <BarSeries argumentField="skill" valueField="duration" />
          </Chart>
        </Paper>
      </Container>
    </Paper>
  );
};
