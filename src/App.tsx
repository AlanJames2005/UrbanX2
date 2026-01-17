import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { MapView } from './pages/MapView';
import { Complaints } from './pages/Complaints';
import { Alerts } from './pages/Alerts';
import { Report } from './pages/Report';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <MapView />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaints"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Complaints />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/alerts"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Alerts />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Report />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
