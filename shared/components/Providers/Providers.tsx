'use client';

import { appTheme } from '@/shared/themes';
import { CssBaseline, ThemeProvider } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props): JSX.Element {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
export default Providers;
