import React from 'react';
import ReactDOM from 'react-dom';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';

import App from './App';

let theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {},
      },
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
