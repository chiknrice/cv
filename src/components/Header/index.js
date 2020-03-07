import React from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Tooltip,
  useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  Menu,
  Face,
  History,
  Email,
  PhoneIphone,
  GitHub,
  Brightness4,
  Brightness5
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { uiActions } from '../../store';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbarIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(0.5)
  },
  title: {
    flexGrow: 1
  }
}));

const mapStateToProps = state => ({ cv: state.cv });
const mapDispatchToProps = dispatch => ({
  handleTogglePaletteTypeClick: () => dispatch(uiActions.togglePaletteType())
});

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ cv, handleTogglePaletteTypeClick }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <AppBar
      position="sticky"
      color={theme.palette.type === 'light' ? 'primary' : 'inherit'}
    >
      <Toolbar>
        <Hidden smUp>
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
        <Hidden xsDown>
          <Tooltip title="About Me">
            <IconButton color="inherit" component={Link} to="/">
              <Face />
            </IconButton>
          </Tooltip>
          <Tooltip title="Work History">
            <IconButton color="inherit" component={Link} to="/timeline">
              <History />
            </IconButton>
          </Tooltip>
          <Tooltip title="Email Me">
            <IconButton color="inherit" href={`mailto:${cv.contact.email}`}>
              <Email />
            </IconButton>
          </Tooltip>
          <Tooltip title={cv.contact.mobile}>
            <IconButton color="inherit" href={`tel:${cv.contact.email}`}>
              <PhoneIphone />
            </IconButton>
          </Tooltip>
          <Tooltip title="My Github">
            <IconButton
              color="inherit"
              href={cv.contact.github}
              target="_blank"
            >
              <GitHub />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle light/dark theme">
            <IconButton color="inherit" onClick={handleTogglePaletteTypeClick}>
              {theme.palette.type === 'light' ? (
                <Brightness4 />
              ) : (
                <Brightness5 />
              )}
            </IconButton>
          </Tooltip>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
});
