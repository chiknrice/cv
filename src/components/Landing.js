import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Divider,
  useTheme
} from '@material-ui/core';
import {
  Chart,
  ArgumentAxis,
  BarSeries
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { makeStyles } from '@material-ui/styles';
import { RichText } from 'components';
import {
  qualificationSummarySelector,
  topSkillsSelector
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

const SkillsChart = () => {
  const classes = useStyles();
  const theme = useTheme();
  const data = useSelector(topSkillsSelector);
  const height = 50 * data.length + 50;
  return (
    <Paper elevation={0} className={classes.topPadding}>
      <Typography variant="h4">Top Skills</Typography>
      <Chart data={data} rotated height={height}>
        <ArgumentAxis />
        <BarSeries
          color={theme.palette.secondary.light}
          argumentField="name"
          valueField="duration"
          pointComponent={props => (
            <BarSeries.Point {...props} maxBarWidth={30} />
          )}
        />
        <Animation />
      </Chart>
    </Paper>
  );
};

export const Landing = () => {
  const classes = useStyles();
  const summary = useSelector(qualificationSummarySelector);

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
        <SkillsChart />
      </Container>
    </Paper>
  );
};
