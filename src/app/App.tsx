import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Layout } from '../components/Layout';
import { LoginPage } from '../pages/LoginPage';
import { AdminDashboard } from '../pages/dashboards/AdminDashboard';
import { StudentDashboard } from '../pages/dashboards/StudentDashboard';
import { ClubHeadDashboard } from '../pages/dashboards/ClubHeadDashboard';
import { EventOrganizerDashboard } from '../pages/dashboards/EventOrganizerDashboard';
import { AuthorityDashboard } from '../pages/dashboards/AuthorityDashboard';
import { VolunteerDashboard } from '../pages/dashboards/VolunteerDashboard';
import { Toaster } from './components/ui/sonner';

function AppRoutes() {
  const { user } = useAuth();

  // Redirect to appropriate dashboard based on role
  const getRoleDashboard = () => {
    if (!user) return '/login';
    
    const roleRoutes: Record<string, string> = {
      admin: '/admin',
      student: '/student',
      club_head: '/club-head',
      event_organizer: '/event-organizer',
      authority: '/authority',
      volunteer: '/volunteer'
    };
    
    return roleRoutes[user.role] || '/login';
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout><AdminDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      
      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout><StudentDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      
      {/* Club Head Routes */}
      <Route
        path="/club-head"
        element={
          <ProtectedRoute allowedRoles={['club_head']}>
            <Layout><ClubHeadDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      
      {/* Event Organizer Routes */}
      <Route
        path="/event-organizer"
        element={
          <ProtectedRoute allowedRoles={['event_organizer']}>
            <Layout><EventOrganizerDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      
      {/* Authority Routes */}
      <Route
        path="/authority"
        element={
          <ProtectedRoute allowedRoles={['authority']}>
            <Layout><AuthorityDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      
      {/* Volunteer Routes */}
      <Route
        path="/volunteer"
        element={
          <ProtectedRoute allowedRoles={['volunteer']}>
            <Layout><VolunteerDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to={getRoleDashboard()} replace />} />
      
      {/* 404 / Unauthorized */}
      <Route path="/unauthorized" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      } />
      
      <Route path="*" element={<Navigate to={getRoleDashboard()} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}
