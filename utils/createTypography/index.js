/*
  Adapted from source:
  https://github.com/mui-org/material-ui/blob/303199d39b42a321d28347d8440d69166f872f27/packages/material-ui/src/styles/createTypography.js
*/
const round = value => Math.round(value * 1e5) / 1e5;

const createTypography = (htmlFontSize = 16, palette) => {
  const sansFontFamily = "'Montserrat', sans-serif";
  const serifFontFamily = "'Lora', serif";
  const fontSize = 16;
  const fontWeightLight = 300;
  const fontWeightRegular = 400;
  const fontWeightMedium = 500;

  const coef = fontSize / 14;
  const pxToRem = value => `${(value / htmlFontSize) * coef}rem`;

  return {
    pxToRem,
    round,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    sansFontFamily,
    serifFontFamily,
    display4: {
      fontSize: pxToRem(45),
      fontWeight: fontWeightRegular,
      fontFamily: sansFontFamily,
      lineHeight: `${round(48 / 45)}em`,
      marginLeft: '-.02em',
      color: palette.text.primary,
    },
    display3: {
      fontSize: pxToRem(45),
      fontWeight: fontWeightRegular,
      fontFamily: sansFontFamily,
      lineHeight: `${round(48 / 45)}em`,
      marginLeft: '-.02em',
      color: palette.text.primary,
    },
    display2: {
      fontSize: pxToRem(18),
      fontWeight: fontWeightMedium,
      fontFamily: sansFontFamily,
      lineHeight: `${round(48 / 45)}em`,
      marginLeft: '-.02em',
      color: palette.text.primary,
    },
    display1: {
      fontSize: pxToRem(16),
      fontWeight: fontWeightMedium,
      fontFamily: sansFontFamily,
      lineHeight: `${round(41 / 34)}em`,
      color: palette.text.primary,
    },
    headline: {
      fontSize: pxToRem(20),
      fontWeight: fontWeightMedium,
      fontFamily: sansFontFamily,
      lineHeight: `${round(32.5 / 24)}em`,
      color: palette.text.primary,
    },
    title: {
      fontSize: pxToRem(14),
      fontWeight: fontWeightMedium,
      fontFamily: sansFontFamily,
      lineHeight: `${round(24.5 / 21)}em`,
      color: palette.text.primary,
    },
    subheading: {
      fontSize: pxToRem(14),
      fontWeight: fontWeightRegular,
      fontFamily: sansFontFamily,
      lineHeight: `${round(24 / 16)}em`,
      color: palette.text.secondary,
    },
    body2: {
      fontSize: pxToRem(14),
      fontWeight: fontWeightRegular,
      fontFamily: serifFontFamily,
      lineHeight: `${round(24 / 14)}em`,
      color: palette.text.primary,
    },
    body1: {
      fontSize: pxToRem(16),
      fontWeight: fontWeightRegular,
      fontFamily: serifFontFamily,
      lineHeight: `${round(24 / 14)}em`,
      color: palette.text.primary,
    },
    caption: {
      fontSize: pxToRem(12),
      fontWeight: fontWeightRegular,
      fontFamily: sansFontFamily,
      lineHeight: `${round(16.5 / 12)}em`,
      color: palette.text.secondary,
    },
    button: {
      fontSize: pxToRem(14),
      textTransform: 'uppercase',
      fontWeight: fontWeightMedium,
      fontFamily: sansFontFamily,
      color: palette.text.primary,
    },
  };
};

export default createTypography;
