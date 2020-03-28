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
  useMediaQuery,
  Menu,
  MenuItem
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

const DesktopMenu = () => {
  const { contact } = useSelector(personalDetailsSelector);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
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
          {theme.palette.type === 'light' ? <Brightness4 /> : <Brightness5 />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Filter Skills">
        <IconButton
          color="inherit"
          onClick={() => dispatch(uiActions.setFilterDrawerOpen())}
        >
          <FilterList />
        </IconButton>
      </Tooltip>
    </Hidden>
  );
};

const MobileMenu = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseWithAction = action => () => {
    handleClose();
    action();
  };

  return (
    <Hidden smUp>
      <Tooltip title="More">
        <IconButton color="inherit" onClick={handleClick}>
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5
          }
        }}
      >
        <MenuItem
          key="0"
          onClick={handleCloseWithAction(() =>
            dispatch(uiActions.togglePaletteType())
          )}
        >
          {`Switch to ${
            theme.palette.type === 'light' ? 'Dark' : 'Light'
          } Theme`}
        </MenuItem>
        <MenuItem
          key="1"
          onClick={handleCloseWithAction(() =>
            dispatch(uiActions.setFilterDrawerOpen())
          )}
        >
          Open Filters
        </MenuItem>
      </Menu>
    </Hidden>
  );
};

export const Header = React.memo(() => {
  const { name, shortName } = useSelector(personalDetailsSelector);
  const classes = useStyles();
  const theme = useTheme();
  // causes re-render on initial load even memoized
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
          <MobileMenu />
          <DesktopMenu />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
});
