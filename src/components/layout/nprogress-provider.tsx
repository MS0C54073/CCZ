
'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useCustomTheme } from '@/hooks/use-custom-theme';

const NProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useCustomTheme();
  // HSL values from globals.css for --primary
  const primaryColor = '158 45% 48%'; 

  return (
    <>
      <ProgressBar
        height="4px"
        color={`hsl(${primaryColor})`}
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default NProgressProvider;
