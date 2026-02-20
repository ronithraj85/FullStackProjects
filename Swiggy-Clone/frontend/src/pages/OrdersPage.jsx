import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../services/api';
import toast from 'react-hot-toast';
import { PackageX } from 'lucide-react';

const STATUS_STEPS = ['PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];

function OrderTracker({ status }) {
  const currentIdx = STATUS_STEPS.indexOf(status);
  if (status === 'CANCELLED') return (
    <div style={{ color: '#f14668', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
      <PackageX size={16} /> Order cancelled
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 0, margin: '16px 0' }}>
      {STATUS_STEPS.map((step, idx) => (
        <React.Fragment key={step}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: idx <= currentIdx ? 'var(--primary)' : 'var(--dark-3)',
              border: `2px solid ${idx <= currentIdx ? 'var(--primary)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: idx <= currentIdx ? 'white' : 'var(--text-muted)'
            }}>
              {idx < currentIdx ? '✓' : idx + 1}
            </div>
            <div style={{ fontSize: 10, color: idx <= currentIdx ? 'var(--primary)' : 'var(--text-muted)', marginTop: 6, textAlign: 'center', lineHeight: 1.3 }}>
              {step.replace(/_/g, ' ')}
            </div>
          </div>
          {idx < STATUS_STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: idx < currentIdx ? 'var(--primary)' : 'var(--border)', marginTop: 13 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    orderApi.getMyOrders()
      .then((r) => setOrders(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (orderId) => {
    try {
      const res = await orderApi.cancel(orderId);
      setOrders(orders.map((o) => o.id === orderId ? res.data : o));
      toast.success('Order cancelled');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot cancel order');
    }
  };

  if (loading) return <div className="spinner" />;

  return (
    <div className="page">
      <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32 }}>Your Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛍️</div>
          <h3>No orders yet</h3>
          <p>Your orders will appear here</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Start Ordering</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div>
                  <div className="order-id">Order #{order.id} · {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                  <div className="order-restaurant">{order.restaurantName}</div>
                </div>
                <div className={`status-badge status-${order.status}`}>{order.status.replace(/_/g, ' ')}</div>
              </div>

              <OrderTracker status={order.status} />

              <div className="order-items-list">
                {order.orderItems?.map((item) => (
                  <div key={item.id} className="order-item-row">
                    <span>{item.menuItemName} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{order.paymentMethod} · {order.paymentStatus}</div>
                  <div className="order-total">₹{order.totalAmount?.toFixed(2)}</div>
                </div>
                {(order.status === 'PLACED' || order.status === 'CONFIRMED') && (
                  <button className="btn btn-danger" onClick={() => handleCancel(order.id)}>
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
