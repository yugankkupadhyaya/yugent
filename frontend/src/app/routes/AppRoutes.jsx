import { Routes, Route } from 'react-router-dom';

import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import ResumeBuilderPage from '@/pages/ResumeBuilderPage';
import ResumePage from '@/pages/ResumePage';
import SignInPage from '@/pages/SignInPage';
import { InterviewPage } from '@/pages/InterviewPage';
import { ProtectedRoute } from './AuthRoute';
import { PublicRoute } from './PublicRoutes';
export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />

      <Route
        path="/login/*"
        element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <ResumePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-builder"
        element={
          <ProtectedRoute>
            <ResumeBuilderPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <InterviewPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
