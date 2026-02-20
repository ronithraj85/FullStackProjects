import React, { useState, useEffect } from 'react';
import { restaurantApi, orderApi } from '../services/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ChefHat, Plus, Store, Package } from 'lucide-react';

function AddRestaurantModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', description: '', cuisine: '', address: '', city: '', deliveryFee: 40, deliveryTime: 30, minOrder: 100, imageUrl: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await restaurantApi.create(form);
      toast.success('Restaurant created!');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create restaurant');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Add Restaurant</h2>
        <form onSubmit={handleSubmit}>
          {[
            { key: 'name', label: 'Restaurant Name', placeholder: 'e.g. Pizza Palace', required: true },
            { key: 'description', label: 'Description', placeholder: 'Short description...' },
            { key: 'cuisine', label: 'Cuisine Type', placeholder: 'e.g. Indian, Chinese' },
            { key: 'address', label: 'Address', placeholder: 'Full address', required: true },
            { key: 'city', label: 'City', placeholder: 'Bangalore', required: true },
            { key: 'imageUrl', label: 'Image URL (optional)', placeholder: 'https://...' },
          ].map(({ key, label, placeholder, required }) => (
            <div className="form-group" key={key}>
              <label className="form-label">{label}</label>
              <input className="form-input" placeholder={placeholder} required={required}
                value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { key: 'deliveryFee', label: 'Delivery Fee (₹)' },
              { key: 'deliveryTime', label: 'Delivery Time (min)' },
              { key: 'minOrder', label: 'Min Order (₹)' },
            ].map(({ key, label }) => (
              <div className="form-group" key={key}>
                <label className="form-label">{label}</label>
                <input type="number" className="form-input"
                  value={form[key]} onChange={(e) => setForm({ ...form, [key]: parseFloat(e.target.value) })} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create Restaurant</button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddMenuItemModal({ restaurant, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', description: '', category: '', price: '', vegetarian: false, imageUrl: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await restaurantApi.addMenuItem(restaurant.id, { ...form, price: parseFloat(form.price) });
      toast.success('Menu item added!');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add item');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Add Menu Item to {restaurant.name}</h2>
        <form onSubmit={handleSubmit}>
          {[
            { key: 'name', label: 'Item Name', required: true, placeholder: 'e.g. Paneer Tikka' },
            { key: 'description', label: 'Description', placeholder: 'Brief description' },
            { key: 'category', label: 'Category', placeholder: 'e.g. Starters, Main Course' },
            { key: 'price', label: 'Price (₹)', required: true, type: 'number', placeholder: '199' },
            { key: 'imageUrl', label: 'Image URL (optional)', placeholder: 'https://...' },
          ].map(({ key, label, required, type, placeholder }) => (
            <div className="form-group" key={key}>
              <label className="form-label">{label}</label>
              <input type={type || 'text'} className="form-input" required={required} placeholder={placeholder}
                value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            </div>
          ))}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.vegetarian}
                onChange={(e) => setForm({ ...form, vegetarian: e.target.checked })}
                style={{ accentColor: 'var(--primary)', width: 18, height: 18 }} />
              <span className="form-label" style={{ margin: 0 }}>🌿 Vegetarian</span>
            </label>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add Item</button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OwnerDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [addMenuTo, setAddMenuTo] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRestaurants = async () => {
    try {
      const res = await restaurantApi.getAll();
      setRestaurants(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRestaurants(); }, []);

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <ChefHat size={32} color="var(--primary)" /> Owner Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your restaurants and menus</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddRestaurant(true)}>
          <Plus size={18} /> Add Restaurant
        </button>
      </div>

      {loading ? <div className="spinner" /> : restaurants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Store size={64} /></div>
          <h3>No restaurants yet</h3>
          <p>Add your first restaurant to get started</p>
          <button className="btn btn-primary" onClick={() => setShowAddRestaurant(true)}>Add Restaurant</button>
        </div>
      ) : (
        <div className="restaurants-grid">
          {restaurants.map((r) => (
            <div key={r.id} style={{ background: 'var(--dark-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              {r.imageUrl && <img src={r.imageUrl} alt={r.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />}
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{r.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 4 }}>{r.cuisine}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>{r.address}</p>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ textAlign: 'center', flex: 1, background: 'var(--dark-3)', borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>{r.menuItems?.length || 0}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Menu Items</div>
                  </div>
                  <div style={{ textAlign: 'center', flex: 1, background: 'var(--dark-3)', borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#52b788' }}>⭐ {r.rating?.toFixed(1)}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Rating</div>
                  </div>
                </div>

                <button className="btn btn-ghost btn-block" onClick={() => setAddMenuTo(r)}>
                  <Plus size={16} /> Add Menu Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddRestaurant && (
        <AddRestaurantModal
          onClose={() => setShowAddRestaurant(false)}
          onSuccess={loadRestaurants}
        />
      )}
      {addMenuTo && (
        <AddMenuItemModal
          restaurant={addMenuTo}
          onClose={() => setAddMenuTo(null)}
          onSuccess={loadRestaurants}
        />
      )}
    </div>
  );
}
