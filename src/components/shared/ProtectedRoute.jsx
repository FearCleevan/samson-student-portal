import { Navigate } from 'react-router-dom';
import { useStudentAuthStore } from '../../store/authStore';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useStudentAuthStore();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}