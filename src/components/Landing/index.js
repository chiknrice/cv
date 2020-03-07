import React from 'react';
import { connect } from 'react-redux';
import { Container, Paper, Typography } from '@material-ui/core';

const mapStateToProps = state => ({
  summary: state.cv.summary
});

export const Landing = connect(mapStateToProps)(({ summary }) => {
  return (
    <Paper elevation={0}>
      <Container>
        <Typography variant="body1" align="justify">
          {summary}
        </Typography>
      </Container>
    </Paper>
  );
});
