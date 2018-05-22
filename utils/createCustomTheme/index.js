/*
  Adapted from source:
  https://github.com/mui-org/material-ui/blob/303199d39b42a321d28347d8440d69166f872f27/packages/material-ui/src/styles/createMuiTheme.js
*/
import createTypography from '../createTypography';
import createBreakpoints from '../../node_modules/@material-ui/core/styles/createBreakpoints';
import createPalette from '../../node_modules/@material-ui/core/styles/createPalette';
import createMixins from '../../node_modules/@material-ui/core/styles/createMixins';
import shadows from '../../node_modules/@material-ui/core/styles/shadows';
import transitions from '../../node_modules/@material-ui/core/styles/transitions';
import zIndex from '../../node_modules/@material-ui/core/styles/zIndex';
import spacing from '../../node_modules/@material-ui/core/styles/spacing';

const createCustomTheme = ({ htmlFontSize, theme }) => {
  const palette = createPalette({
    primary: {
      light: '#52c7b8',
      main: '#009688',
      dark: '#00675b',
      contrastText: '#000',
    },
    secondary: {
      light: '#6ed9ff',
      main: '#28a8e0',
      dark: '#0079ae',
      contrastText: '#000',
    },
    type: theme,
  });
  const breakpoints = createBreakpoints({});
  const mixins = createMixins(breakpoints, spacing, {});
  const typography = createTypography(htmlFontSize, palette);

  const muiTheme = {
    breakpoints,
    direction: 'ltr',
    mixins,
    overrides: {},
    palette,
    props: {},
    shadows,
    typography,
    transitions,
    spacing,
    zIndex,
  };

  return muiTheme;
};

export default createCustomTheme;
