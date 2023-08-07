import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  palette: {
    primary: { main: '#6d28d9' },
    secondary: { main: '#4338ca' },
    info: { main: '#cbd5e1' },
    success: { main: '#22c55e' },
    error: { main: '#ef4444' },
    mode: 'dark',
    background: {
      default: '#190628',
      paper: '#190628'
    }
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
