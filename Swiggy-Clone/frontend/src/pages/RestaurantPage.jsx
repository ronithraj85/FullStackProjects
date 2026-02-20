import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Clock, Bike, ShoppingCart, Plus, Minus } from 'lucide-react';
import { restaurantApi } from '../services/api';
import { addToCart, removeFromCart, selectCartTotal } from '../store/cartSlice';
import toast from 'react-hot-toast';

function MenuItemCard({ item, cartItems, onAdd, onRemove }) {
  const cartItem = cartItems.find((c) => c.id === item.id);
  const qty = cartItem?.quantity || 0;

  return (
    <div className="menu-item-card">
      <div className="veg-dot" style={{ borderColor: item.vegetarian ? '#52b788' : '#e63946' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.vegetarian ? '#52b788' : '#e63946' }} />
      </div>
      <div className="menu-item-info">
        <div className="menu-item-name">{item.name}</div>
        <div className="menu-item-desc">{item.description}</div>
        <div className="menu-item-price">₹{item.price}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        {item.imageUrl && (
          <img src={item.imageUrl} alt={item.name} className="menu-item-img"
            style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 10 }} />
        )}
        {qty === 0 ? (
          <button className="add-btn" onClick={() => onAdd(item)}>ADD</button>
        ) : (
          <div className="qty-control">
            <button className="qty-btn" onClick={() => onRemove(item.id)}>
              <Minus size={14} />
            </button>
            <span className="qty-count">{qty}</span>
            <button className="qty-btn" onClick={() => onAdd(item)}>
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RestaurantPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { items: cartItems, restaurantId: cartRestaurantId } = useSelector((s) => s.cart);
  const cartTotal = useSelector(selectCartTotal);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restaurantApi.getById(id)
      .then((r) => setRestaurant(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = (item) => {
    if (!user) { toast.error('Please login to add items'); navigate('/login'); return; }
    if (cartRestaurantId && cartRestaurantId !== parseInt(id)) {
      const ok = window.confirm('Your cart has items from another restaurant. Clear and start fresh?');
      if (!ok) return;
    }
    dispatch(addToCart({ item, restaurantId: parseInt(id), restaurantName: restaurant.name }));
    toast.success(`${item.name} added to cart`);
  };

  const handleRemove = (itemId) => dispatch(removeFromCart(itemId));

  if (loading) return <div className="spinner" />;
  if (!restaurant) return <div className="page"><p>Restaurant not found</p></div>;

  // Group menu items by category
  const categories = restaurant.menuItems?.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {}) || {};

  const cartItemsForRestaurant = cartRestaurantId === parseInt(id) ? cartItems : [];

  return (
    <div className="restaurant-page">
      <div className="restaurant-hero-card">
        {restaurant.imageUrl && (
          <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-hero-img" />
        )}
        <div className="restaurant-hero-info">
          <h1>{restaurant.name}</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>{restaurant.description}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{restaurant.address}</p>
          <div className="restaurant-hero-tags">
            <div className="tag" style={{ background: '#2d6a4f22', borderColor: '#52b78844', color: '#52b788' }}>
              <Star size={14} fill="currentColor" /> {restaurant.rating?.toFixed(1)}
            </div>
            <div className="tag"><Clock size={14} /> {restaurant.deliveryTime} mins</div>
            <div className="tag"><Bike size={14} /> ₹{restaurant.deliveryFee} delivery</div>
            <div className="tag tag-primary">{restaurant.cuisine}</div>
          </div>
        </div>
      </div>

      <div className="menu-layout">
        <div>
          {Object.entries(categories).map(([cat, items]) => (
            <div key={cat} className="menu-section">
              <div className="menu-section-title">{cat} ({items.length})</div>
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  cartItems={cartItemsForRestaurant}
                  onAdd={handleAdd}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="cart-sidebar">
          <div className="cart-sidebar-title">
            <ShoppingCart size={20} />
            Your Order
          </div>

          {cartItemsForRestaurant.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '32px 0' }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>🛒</p>
              <p>Your cart is empty</p>
              <p style={{ fontSize: 13, marginTop: 8 }}>Add items to get started</p>
            </div>
          ) : (
            <>
              {cartItemsForRestaurant.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price} × {item.quantity}</div>
                  </div>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => handleRemove(item.id)}>
                      <Minus size={12} />
                    </button>
                    <span className="qty-count">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleAdd(item)}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <div className="cart-total-row">
                  <span>Item total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="cart-total-row">
                  <span>Delivery fee</span>
                  <span>₹{restaurant.deliveryFee}</span>
                </div>
                <div className="cart-total-row grand">
                  <span>Grand Total</span>
                  <span>₹{(cartTotal + restaurant.deliveryFee).toFixed(2)}</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate('/cart')}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
