import { Heart, Trash2, Share2, MapPin, Clock, Eye } from 'lucide-react';
import { useState } from 'react';
import '../styles/WishlistPage.css';

const mockWishlist = [
    { id: 1, title: 'iPhone 15 Pro Max 256GB', price: 119000, location: 'Mumbai, Maharashtra', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80', time: '2 days ago', views: 340, category: 'Mobiles', badge: 'Featured' },
    { id: 2, title: 'Royal Enfield Classic 350', price: 185000, location: 'Bangalore, Karnataka', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', time: '3 days ago', views: 520, category: 'Bikes', badge: 'Hot Deal' },
    { id: 3, title: '3 BHK Sea Facing Flat', price: 8500000, location: 'Mumbai, Maharashtra', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80', time: '1 week ago', views: 890, category: 'Property', badge: null },
    { id: 4, title: 'MacBook Pro M3 14"', price: 189000, location: 'Bangalore, Karnataka', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80', time: '5 days ago', views: 215, category: 'Electronics', badge: 'Featured' },
    { id: 5, title: 'PS5 Disc Edition', price: 48000, location: 'Hyderabad, Telangana', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80', time: '1 day ago', views: 670, category: 'Electronics', badge: 'New' },
    { id: 6, title: 'Honda City 2021 ZX CVT', price: 1050000, location: 'Delhi, NCR', image: 'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=400&q=80', time: '4 days ago', views: 480, category: 'Cars', badge: null },
];

const badgeColors = { Featured: '#FFB300', 'Hot Deal': '#FF5B5B', New: '#23E5DB' };

function formatPrice(p) {
    if (p >= 100000) return '₹' + (p / 100000).toFixed(2).replace(/\.?0+$/, '') + ' L';
    return '₹' + p.toLocaleString('en-IN');
}

export default function WishlistPage() {
    const [items, setItems] = useState(mockWishlist);

    const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));

    return (
        <div className="wishlist-page">
            <div className="container">
                <div className="wishlist-header">
                    <div className="wishlist-title-row">
                        <Heart size={22} className="wishlist-icon" fill="currentColor" />
                        <h1 className="wishlist-title">My Wishlist</h1>
                        <span className="wishlist-count">{items.length} saved</span>
                    </div>
                    <button className="wishlist-clear-btn" onClick={() => setItems([])}>
                        <Trash2 size={14} /> Clear All
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="wishlist-empty">
                        <div className="wishlist-empty-icon">💔</div>
                        <h2>Your wishlist is empty</h2>
                        <p>Save listings you love by tapping the ♡ icon on any ad.</p>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {items.map(item => (
                            <div key={item.id} className="wishlist-card">
                                <div className="wc-img-wrap">
                                    <img src={item.image} alt={item.title} loading="lazy" />
                                    {item.badge && (
                                        <span className="wc-badge" style={{ background: badgeColors[item.badge] || '#23E5DB' }}>
                                            {item.badge}
                                        </span>
                                    )}
                                    <div className="wc-actions">
                                        <button className="wc-action-btn" title="Remove from wishlist" onClick={() => remove(item.id)}>
                                            <Heart size={15} fill="currentColor" />
                                        </button>
                                        <button className="wc-action-btn" title="Share">
                                            <Share2 size={15} />
                                        </button>
                                    </div>
                                </div>
                                <div className="wc-body">
                                    <span className="wc-category">{item.category}</span>
                                    <div className="wc-price">{formatPrice(item.price)}</div>
                                    <h3 className="wc-title">{item.title}</h3>
                                    <div className="wc-meta">
                                        <span><MapPin size={11} /> {item.location}</span>
                                        <span><Clock size={11} /> {item.time}</span>
                                    </div>
                                    <div className="wc-footer">
                                        <span className="wc-views"><Eye size={12} /> {item.views} views</span>
                                        <button className="wc-contact-btn">Contact Seller</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
