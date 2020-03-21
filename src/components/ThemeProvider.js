import React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
import { themeOptionsSelector } from 'store/selectors';

export const ThemeProvider = ({ children }) => {
  const themeOptions = useSelector(themeOptionsSelector);
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: orange,
      type: themeOptions.paletteType
    }
  });
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
