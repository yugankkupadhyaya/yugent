import { Routes, Route } from 'react-router-dom';

import { LandingPage } from '@/app/routes/landing-page';
import { DashboardPage } from '@/app/routes/dashboard-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
