import { useEffect } from 'react';
import { AppRoutes } from './app/routes/AppRoutes';
import { applyTheme, getStoredTheme } from './lib/theme';

function App() {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return <AppRoutes />;
}

export default App;
