import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { addToCart, removeFromCart, clearCart, selectCartTotal } from '../store/cartSlice';
import { orderApi } from '../services/api';
import toast from 'react-hot-toast';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { items, restaurantId, restaurantName } = useSelector((s) => s.cart);
  const cartTotal = useSelector(selectCartTotal);
  const [address, setAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [placing, setPlacing] = useState(false);

  const deliveryFee = 40;

  const handlePlaceOrder = async () => {
    if (!address.trim()) { toast.error('Please enter delivery address'); return; }

    setPlacing(true);
    try {
      const payload = {
        restaurantId,
        items: items.map((i) => ({ menuItemId: i.id, quantity: i.quantity })),
        deliveryAddress: address,
        paymentMethod,
      };
      const res = await orderApi.create(payload);
      dispatch(clearCart());
      toast.success(`Order #${res.data.id} placed successfully! 🎉`);
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious food to get started</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Restaurants</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: 800 }}>
      <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 8 }}>Checkout</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>From {restaurantName}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
        <div>
          {/* Cart Items */}
          <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 24 }}>
            <h3 style={{ marginBottom: 20, fontWeight: 700 }}>Order Items</h3>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{item.price} each</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => dispatch(removeFromCart(item.id))}>−</button>
                    <span className="qty-count">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => dispatch(addToCart({ item, restaurantId, restaurantName }))}>+</button>
                  </div>
                  <span style={{ fontWeight: 700, minWidth: 70, textAlign: 'right' }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16, fontWeight: 700 }}>Delivery Address</h3>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Enter your full delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Payment */}
          <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24 }}>
            <h3 style={{ marginBottom: 16, fontWeight: 700 }}>Payment Method</h3>
            {['COD', 'UPI', 'CARD'].map((method) => (
              <label key={method} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span style={{ fontWeight: 500 }}>
                  {method === 'COD' ? '💵 Cash on Delivery' :
                   method === 'UPI' ? '📱 UPI / GPay / PhonePe' :
                   '💳 Credit / Debit Card'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Bill Summary */}
        <div>
          <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, position: 'sticky', top: 90 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Bill Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="cart-total-row" style={{ marginBottom: 10 }}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="cart-total-row" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-total-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="cart-total-row" style={{ marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--border)', fontWeight: 700, color: 'var(--text)', fontSize: 17 }}>
              <span>Total</span>
              <span>₹{(cartTotal + deliveryFee).toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={handlePlaceOrder}
              disabled={placing}
              style={{ marginTop: 24 }}
            >
              <ShoppingBag size={18} />
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>

            <button
              className="btn btn-ghost btn-block"
              onClick={() => dispatch(clearCart())}
              style={{ marginTop: 8 }}
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
