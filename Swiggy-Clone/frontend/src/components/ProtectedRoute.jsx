import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useSelector((s) => s.auth);

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.some(r => user.roles?.includes(r))) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-icon">🚫</div>
          <h3>Access Denied</h3>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
}
