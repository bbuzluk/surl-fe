import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../commons/AuthContext';
import { postUser } from '../services/authService';
import { useForm } from '../hooks/useForm';
import type { IRegisterData } from '../types/auth';
import AuthLayout from '../components/layout/AuthLayout';


const RegisterPage: React.FC = () => {

  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  interface IRegisterFormData extends IRegisterData {
    confirmPassword: string;
  }

  const { formData, handleChange } = useForm<IRegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await postUser(registerData);
      alert("Registration successful! Please log in.");
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Get started with your new account"
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
            placeholder="your_username"
            required
            disabled={loading}
          />
        </label>

        <label className="label">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            placeholder="you@example.com"
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
            placeholder="•••••••• (min. 6 characters)"
            required
            disabled={loading}
          />
        </label>

        <label className="label">
          <span>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </label>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

      </form>

      <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--muted)', fontSize: '14px' }}>
        Already have an account?
        <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 500, marginLeft: 4 }}>
          Sign In
        </Link>
      </p>

    </AuthLayout>
  );
};

export default RegisterPage;