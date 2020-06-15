import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'cursive',
      'sans-serif',
      '"Comic Sans MS"',
    ].join('.'),
  },
});
