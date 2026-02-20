import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/authSlice';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => { if (user) navigate('/'); }, [user, navigate]);
  useEffect(() => { return () => dispatch(clearError()); }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (!result.error) {
      toast.success('Welcome back! 👋');
      navigate('/');
    }
  };

  const fillDemo = (email, password) => setForm({ email, password });

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">Welcome back</div>
        <div className="auth-subtitle">Sign in to your SwigClone account</div>

        {/* Demo credentials */}
        <div style={{ background: 'var(--dark-3)', borderRadius: 10, padding: 16, marginBottom: 24, fontSize: 13 }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600 }}>🧪 Demo Accounts:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: 'Customer', email: 'customer@test.com', pass: 'customer123' },
              { label: 'Restaurant Owner', email: 'owner@test.com', pass: 'owner123' },
              { label: 'Admin', email: 'admin@swiggy.com', pass: 'admin123' },
            ].map((d) => (
              <button key={d.email} onClick={() => fillDemo(d.email, d.pass)}
                style={{ background: 'var(--dark-4)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', color: 'var(--text)', fontSize: 13, textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{d.label}</span>
                <span style={{ color: 'var(--text-muted)' }}>{d.email}</span>
              </button>
            ))}
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="you@example.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="divider" style={{ marginTop: 24 }}>or</div>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 14, marginTop: 16 }}>
          New to SwigClone? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Create account</Link>
        </p>
      </div>
    </div>
  );
}
