import React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ themeOptions: state.ui.themeOptions });

export const ThemeProvider = connect(mapStateToProps)(
  ({ themeOptions, children }) => {
    const theme = createMuiTheme({
      palette: {
        primary: blue,
        secondary: orange,
        type: themeOptions.paletteType
      }
    });
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
  }
);
