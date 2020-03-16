import React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';

export const ThemeProvider = ({ children }) => {
  const themeOptions = useSelector(state => state.ui.themeOptions);
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: orange,
      type: themeOptions.paletteType
    }
  });
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
