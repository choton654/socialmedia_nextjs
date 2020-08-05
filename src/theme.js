import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#64b5f6',
      main: '#1e88e5',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      dark: '#b22a00',
      main: '#ff3d00',
      contrastText: '#fff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ddd',
    },
  },
});

export default theme;
