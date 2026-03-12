import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, Heart, Share2, Phone, MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';
import { listings } from '../data/listings';
import '../styles/ListingDetailPage.css';

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
    const now = new Date('2024-03-02');
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
}

export default function ListingDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [wished, setWished] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const item = listings.find((l) => l.id === parseInt(id));
        setListing(item);
    }, [id]);

    if (!listing) {
        return (
            <div className="listing-not-found">
                <h2>Listing Not Found</h2>
                <p>The item you are looking for might have been sold or removed.</p>
                <button className="back-home-btn" onClick={() => navigate('/')}>
                    Go Back Home
                </button>
            </div>
        );
    }

    return (
        <div className="listing-detail-page">
            <div className="detail-container">
                {/* Breadcrumb / Back button */}
                <div className="detail-breadcrumb">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ChevronLeft size={20} />
                        Back to listings
                    </button>
                    <div className="breadcrumb-path">
                        <Link to="/">Home</Link>
                        <span className="separator">/</span>
                        <span className="cat">{listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}</span>
                        <span className="separator">/</span>
                        <span className="current">{listing.title}</span>
                    </div>
                </div>

                <div className="detail-content-wrapper">
                    {/* Left Side: Images & Info */}
                    <div className="detail-main">
                        <div className="image-gallery">
                            <div className="main-image-container">
                                <img src={listing.image} alt={listing.title} className="detail-main-image" />
                                <div className="image-badge-overlay">
                                    {listing.isFeatured && <span className="badge featured">Featured</span>}
                                    {listing.isNew && <span className="badge new">New</span>}
                                </div>
                            </div>
                        </div>

                        <div className="detail-section info-section">
                            <h1 className="detail-title">{listing.title}</h1>
                            
                            <div className="detail-meta-row">
                                <div className="meta-item location">
                                    <MapPin size={16} />
                                    <span>{listing.area}, {listing.location}</span>
                                </div>
                                <div className="meta-item time">
                                    <Clock size={16} />
                                    <span>Posted {timeAgo(listing.postedAt)}</span>
                                </div>
                                {listing.condition && (
                                    <div className="meta-item condition">
                                        <AlertCircle size={16} />
                                        <span>{listing.condition}</span>
                                    </div>
                                )}
                            </div>

                            <hr className="divider" />

                            <div className="detail-description">
                                <h3>Description</h3>
                                <p>{listing.description}</p>
                                {/* Generating dummy text to make the page look richer */}
                                <p className="extended-desc">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Price & Seller */}
                    <div className="detail-sidebar">
                        {/* Price Card */}
                        <div className="sidebar-card price-card">
                            <div className="price-header">
                                <h2 className="price-amount">{formatPrice(listing.price, listing.category)}</h2>
                                <div className="action-icons">
                                    <button 
                                        className={`icon-btn share-btn`} 
                                        title="Share"
                                    >
                                        <Share2 size={22} />
                                    </button>
                                    <button 
                                        className={`icon-btn heart-btn ${wished ? 'wished' : ''}`} 
                                        onClick={() => setWished(!wished)}
                                        title="Save to Wishlist"
                                    >
                                        <Heart size={22} fill={wished ? 'currentColor' : 'none'} />
                                    </button>
                                </div>
                            </div>
                            <div className="make-offer">
                                <button className="offer-btn">Make an Offer</button>
                            </div>
                        </div>

                        {/* Seller Card */}
                        <div className="sidebar-card seller-card">
                            <h3 className="card-heading">Seller Details</h3>
                            <div className="seller-profile">
                                <div className="seller-avatar">
                                    {listing.seller.charAt(0)}
                                </div>
                                <div className="seller-info">
                                    <h4 className="seller-name">{listing.seller}</h4>
                                    <span className="seller-member-since">Member since {new Date().getFullYear() - 1}</span>
                                </div>
                            </div>

                            <div className="seller-trust">
                                <ShieldCheck size={16} />
                                <span>Verified Phone Number</span>
                            </div>

                            <div className="seller-actions">
                                <button className="action-btn chat-btn">
                                    <MessageSquare size={18} />
                                    Chat with Seller
                                </button>
                                <button 
                                    className="action-btn phone-btn"
                                    onClick={() => setShowPhone(!showPhone)}
                                >
                                    <Phone size={18} />
                                    {showPhone ? '+91 98765 43210' : 'Show Phone Number'}
                                </button>
                            </div>
                        </div>

                        {/* Safety Tips Card */}
                        <div className="sidebar-card safety-card">
                            <h3 className="card-heading">Safety Tips</h3>
                            <ul className="safety-list">
                                <li>Meet in a safe & public place</li>
                                <li>Don't pay in advance</li>
                                <li>Inspect the item before buying</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
