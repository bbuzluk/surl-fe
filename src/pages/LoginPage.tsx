import { Navigate } from 'react-router-dom';
import { useAuth } from '../commons/AuthContext';
import Login from '../components/Login';
export default function LoginPage() {
  const { token } = useAuth();
  return (
    token ? <Navigate to="/" replace /> : <Login />
  );
}
