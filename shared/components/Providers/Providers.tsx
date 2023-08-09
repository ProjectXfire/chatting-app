'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from '@/shared/themes';

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
