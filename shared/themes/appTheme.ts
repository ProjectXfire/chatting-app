import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  palette: {
    primary: { main: '#a78bfa' },
    secondary: { main: '#818cf8' },
    info: { main: '#cbd5e1' },
    success: { main: '#22c55e' },
    error: { main: '#ef4444' },
    mode: 'dark',
    background: {
      default: '#190628',
      paper: '#190628'
    }
  },
  typography: {
    fontFamily: 'inherit'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});
