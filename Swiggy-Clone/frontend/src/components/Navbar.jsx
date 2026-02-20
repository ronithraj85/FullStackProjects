import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Search, User, LogOut, ChefHat } from 'lucide-react';
import { logout } from '../store/authSlice';
import { selectCartCount } from '../store/cartSlice';
import toast from 'react-hot-toast';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const cartCount = useSelector(selectCartCount);
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/?search=${encodeURIComponent(search)}`);
  };

  const isOwner = user?.roles?.some(r => r === 'ROLE_RESTAURANT_OWNER' || r === 'ROLE_ADMIN');
  const isCustomer = user?.roles?.some(r => r === 'ROLE_CUSTOMER');

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">Swig<span>Clone</span></Link>

        <div className="nav-search">
          <form onSubmit={handleSearch}>
            <Search size={16} className="nav-search-icon" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        <div className="nav-links">
          {user ? (
            <>
              {isCustomer && (
                <>
                  <Link to="/cart" className="nav-btn nav-btn-ghost">
                    <ShoppingCart size={18} />
                    Cart
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </Link>
                  <Link to="/orders" className="nav-btn nav-btn-ghost">
                    Orders
                  </Link>
                </>
              )}
              {isOwner && (
                <Link to="/owner" className="nav-btn nav-btn-ghost">
                  <ChefHat size={18} />
                  Dashboard
                </Link>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <button onClick={handleLogout} className="nav-btn nav-btn-ghost" style={{ padding: '8px' }}>
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn nav-btn-outline">Login</Link>
              <Link to="/register" className="nav-btn nav-btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
