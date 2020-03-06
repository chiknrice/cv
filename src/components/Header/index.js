import React from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Menu, PhoneIphone, Email } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  contactIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(0.5)
  },
  title: {
    flexGrow: 1
  }
}));

const mapStateToProps = state => ({ cv: state.cv });

export const Header = connect(mapStateToProps)(({ cv }) => {
  const classes = useStyles();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
        </Hidden>
        <Typography variant="h6" className={classes.title}>
          {cv.name}
        </Typography>
        <Email fontSize="small" className={classes.contactIcon} />
        <Hidden smDown>
          <Typography>{cv.contact.email}</Typography>
        </Hidden>
        <PhoneIphone fontSize="small" className={classes.contactIcon} />
        <Hidden smDown>
          <Typography>{cv.contact.mobile}</Typography>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
});
