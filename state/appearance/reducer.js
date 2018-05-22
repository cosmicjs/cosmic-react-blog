import { THEMES } from '../../utils/constants';
import { actionTypes } from './actions';

const {
  DECREASE_FONT_SIZE,
  INCREASE_FONT_SIZE,
  SET_HTML_FONT_SIZE,
  SET_THEME,
} = actionTypes;

const defaultRootState = {
  htmlFontSize: 16,
  theme: THEMES.LIGHT,
};

const rootReducer = (state = defaultRootState, action) => {
  switch (action.type) {
    case DECREASE_FONT_SIZE:
      return {
        ...state,
        htmlFontSize: state.htmlFontSize + 1,
      };
    case INCREASE_FONT_SIZE:
      return {
        ...state,
        htmlFontSize: state.htmlFontSize - 1,
      };
    case SET_HTML_FONT_SIZE:
      return {
        ...state,
        htmlFontSize: action.size,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default rootReducer;
