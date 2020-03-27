import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  MoreVert,
  Face,
  History,
  Email,
  PhoneIphone,
  GitHub,
  Brightness4,
  Brightness5,
  FilterList
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { uiActions } from 'store';
import { personalDetailsSelector } from 'store/selectors';

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(0.5)
  },
  title: {
    flexGrow: 1
  },
  offset: theme.mixins.toolbar
}));

export const Header = () => {
  const { name, shortName, contact } = useSelector(personalDetailsSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const useLong = useMediaQuery('(min-width:663px)');
  return (
    <>
      <AppBar
        position="fixed"
        color={theme.palette.type === 'light' ? 'primary' : 'inherit'}
      >
        <Toolbar>
          <Typography variant="h5" noWrap={true} className={classes.title}>
            {useLong ? name : shortName}
          </Typography>
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
          <Hidden smUp>
            <Tooltip title="More">
              <IconButton color="inherit">
                <MoreVert />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Hidden xsDown>
            <Tooltip title="Email Me">
              <IconButton color="inherit" href={`mailto:${contact.email}`}>
                <Email />
              </IconButton>
            </Tooltip>
            <Tooltip title={contact.mobile}>
              <IconButton color="inherit" href={`tel:${contact.email}`}>
                <PhoneIphone />
              </IconButton>
            </Tooltip>
            <Tooltip title="My Github">
              <IconButton color="inherit" href={contact.github} target="_blank">
                <GitHub />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={`Switch to ${
                theme.palette.type === 'light' ? 'Dark' : 'Light'
              } Theme`}
            >
              <IconButton
                color="inherit"
                onClick={() => dispatch(uiActions.togglePaletteType())}
              >
                {theme.palette.type === 'light' ? (
                  <Brightness4 />
                ) : (
                  <Brightness5 />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter Skills">
              <IconButton
                color="inherit"
                onClick={() => dispatch(uiActions.setFilterDrawerVisible(true))}
              >
                <FilterList />
              </IconButton>
            </Tooltip>
          </Hidden>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};
