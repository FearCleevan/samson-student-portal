import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';

import Login from './components/auth/Login';
import CreatePassword from './components/auth/CreatePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import PortalLayout from './components/dashboard/PortalLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import MySubjects from './components/dashboard/MySubjects';
import MyPayments from './components/dashboard/MyPayments';
import MyProfile from './components/dashboard/MyProfile';
import Announcements from './components/dashboard/Announcements';
import ProtectedRoute from './components/shared/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-password/:token" element={<CreatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/portal"
          element={
            <ProtectedRoute>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="subjects" element={<MySubjects />} />
          <Route path="payments" element={<MyPayments />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}