import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Eye, Star, Zap } from 'lucide-react';
import '../styles/ListingCard.css';

function formatPrice(price, category) {
    if (category === 'jobs') {
        if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L/yr`;
        return `₹${price.toLocaleString('en-IN')}/yr`;
    }
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
    return `₹${price.toLocaleString('en-IN')}`;
}

function timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date('2024-03-02'); // fixed for mock data
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
}

export default function ListingCard({ listing }) {
    const [wished, setWished] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
        <Link to={`/listing/${listing.id}`} className="listing-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            {/* Image */}
            <div className="card-image-wrap">
                <img
                    src={imgError ? 'https://placehold.co/400x280/002F34/23E5DB?text=No+Image' : listing.image}
                    alt={listing.title}
                    className="card-image"
                    onError={() => setImgError(true)}
                    loading="lazy"
                />

                {/* Badges */}
                <div className="card-badges">
                    {listing.isFeatured && (
                        <span className="badge-featured-card">
                            <Star size={10} fill="currentColor" /> Featured
                        </span>
                    )}
                    {listing.isNew && (
                        <span className="badge-new-card">
                            <Zap size={10} fill="currentColor" /> New
                        </span>
                    )}
                </div>

                {/* Wishlist */}
                <button
                    className={`wishlist-btn ${wished ? 'wished' : ''}`}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWished(!wished); }}
                    title="Save to wishlist"
                >
                    <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
                </button>

                {/* Condition Tag */}
                {listing.condition && (
                    <span className="condition-tag">{listing.condition}</span>
                )}
            </div>

            {/* Content */}
            <div className="card-body">
                <div className="card-price">{formatPrice(listing.price, listing.category)}</div>

                <h3 className="card-title" title={listing.title}>
                    {listing.title}
                </h3>

                <div className="card-meta">
                    <span className="card-location">
                        <MapPin size={12} />
                        {listing.area}, {listing.location}
                    </span>
                    <span className="card-views">
                        <Eye size={12} />
                        {listing.views}
                    </span>
                </div>
            </div>
        </Link>
    );
}
