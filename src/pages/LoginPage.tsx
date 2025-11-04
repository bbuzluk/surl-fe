import { useEffect, useState } from 'react';
import Login from '../components/Login';
import { Navigate } from 'react-router-dom';
export default function LoginPage() {
  const [loginSuccess, setLoginSuccess] = useState(false);


  useEffect(() => {
    localStorage.getItem('token') && setLoginSuccess(true);
  }, []);


  return (
    loginSuccess ?
      <Navigate to="/" replace />
      :
      <Login onLoginSuccess={() => setLoginSuccess(true)} />

  );
}
