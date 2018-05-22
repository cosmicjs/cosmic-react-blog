const config = require('../config');

const BASE_URL = process.env.NODE_ENV === 'production'
  ? config.BASE_URL
  : `http://localhost:${process.env.PORT}`;

const API_URL = process.env.NODE_ENV === 'production'
  ? config.API_URL
  : `http://localhost:${process.env.PORT || 8080}/api`;

const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export {
  API_URL,
  BASE_URL,
  THEMES,
};
