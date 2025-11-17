import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../commons/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';


const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(username, password);
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
      subtitle="Sign in to your Short Url account"
    >
      <form onSubmit={handleSubmit} className="form">

        {error && <div className="alert">{error}</div>}

        <label className="label">
          <span>Username</span>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <Link to="/create-account" style={{ color: 'var(--primary)', fontWeight: 500, marginLeft: 4 }}>
          Sign Up
        </Link>
      </p>

    </AuthLayout>
  );
};

export default LoginPage;
