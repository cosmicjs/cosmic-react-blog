const actionTypes = {
  DECREASE_FONT_SIZE: 'DECREASE_FONT_SIZE',
  INCREASE_FONT_SIZE: 'INCREASE_FONT_SIZE',
  SET_HTML_FONT_SIZE: 'SET_HTML_FONT_SIZE',
  SET_THEME: 'SET_THEME',
};

const decreaseFontSize = () => ({
  type: actionTypes.DECREASE_FONT_SIZE,
});

const increaseFontSize = () => ({
  type: actionTypes.INCREASE_FONT_SIZE,
});

const setHtmlFontSize = size => ({
  type: actionTypes.SET_HTML_FONT_SIZE,
  size,
});

const setTheme = theme => ({
  type: actionTypes.SET_THEME,
  theme,
});

export {
  actionTypes,
  decreaseFontSize,
  increaseFontSize,
  setHtmlFontSize,
  setTheme,
};
