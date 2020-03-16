import React from 'react';
import { connect } from 'react-redux';
import { Container, Paper, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RichText } from 'components';

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

const mapStateToProps = state => ({
  summary: state.cv.summary
});

export const Landing = connect(mapStateToProps)(({ summary }) => {
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
      </Container>
    </Paper>
  );
});
