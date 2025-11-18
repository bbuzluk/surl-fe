import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../commons/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import { useForm } from '../hooks/useForm';
import type { ILoginData } from '../types/auth';


const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { formData, handleChange } = useForm<ILoginData>({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
    >
      <form onSubmit={handleSubmit} className="form">

        {error && <div className="alert">{error}</div>}

        <label className="label">
          <span>Username</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input"
            placeholder="username"
            required
            disabled={loading}
          />
        </label>

        <label className="label">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </label>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

      </form>

      <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--muted)', fontSize: '14px' }}>
        Don't have an account?
        <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 500, marginLeft: 4 }}>
          Sign Up
        </Link>
      </p>

    </AuthLayout>
  );
};

export default LoginPage;
