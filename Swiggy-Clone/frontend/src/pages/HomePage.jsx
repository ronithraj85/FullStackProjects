import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Clock, ChevronRight, Flame } from 'lucide-react';
import { restaurantApi } from '../services/api';

const cuisineIcons = {
  'American, Fast Food': '🍔',
  'Pizza, Italian': '🍕',
  'Indian, Biryani': '🍛',
  default: '🍽️',
};

function RestaurantCard({ restaurant }) {
  const icon = cuisineIcons[restaurant.cuisine] || cuisineIcons.default;
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card">
      {restaurant.imageUrl ? (
        <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-card-img" />
      ) : (
        <div className="restaurant-card-img-placeholder">{icon}</div>
      )}
      <div className="restaurant-card-body">
        <div className="restaurant-card-header">
          <div className="restaurant-card-name">{restaurant.name}</div>
          <div className="rating-badge">
            <Star size={12} fill="currentColor" />
            {restaurant.rating?.toFixed(1)}
          </div>
        </div>
        <div className="restaurant-card-cuisine">{restaurant.cuisine}</div>
        <div className="restaurant-card-meta">
          <span><Clock size={13} /> {restaurant.deliveryTime} mins</span>
          <span>₹{restaurant.deliveryFee} delivery</span>
          <span>₹{restaurant.minOrder} min</span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await restaurantApi.getAll(searchQuery);
        setRestaurants(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [searchQuery]);

  return (
    <div>
      {!searchQuery && (
        <div className="hero">
          <h1>
            Hungry? We've got<br />
            <em>food for every mood</em>
          </h1>
          <p>Order from the best restaurants near you. Fast delivery, fresh food.</p>
        </div>
      )}

      <div className="page">
        {searchQuery && (
          <div style={{ marginBottom: 24 }}>
            <h2 className="section-title">
              Results for "{searchQuery}"
            </h2>
          </div>
        )}

        <div className="section">
          {!searchQuery && (
            <h2 className="section-title">
              <Flame size={24} color="var(--primary)" />
              Popular Restaurants
            </h2>
          )}

          {loading ? (
            <div className="spinner" />
          ) : restaurants.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No restaurants found</h3>
              <p>Try a different search term</p>
            </div>
          ) : (
            <div className="restaurants-grid">
              {restaurants.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
