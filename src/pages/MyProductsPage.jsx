import { useState, useEffect } from 'react';
import { Package, TrendingUp, Clock, AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';
import axios from 'axios';
import '../styles/MyProducts.css';

export default function MyProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPromo, setShowPromo] = useState(null); // Product to promote

    const fetchMyProducts = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/products/my', config);
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyProducts();
    }, []);

    const handlePromoteSuccess = () => {
        setShowPromo(null);
        fetchMyProducts();
    };

    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading your ads...</div>;

    return (
        <div className="my-products-page container animate-in">
            <header className="my-ads-header">
                <h1 className="my-ads-title">My Ads</h1>
                <p className="my-ads-sub">Manage and promote your listings to sell faster</p>
            </header>

            {products.length === 0 ? (
                <div className="empty-ads">
                    <Package size={48} className="empty-icon" />
                    <h3>No ads posted yet</h3>
                    <p>Start selling your items today!</p>
                </div>
            ) : (
                <div className="ads-grid-list">
                    {products.map(p => (
                        <div key={p._id} className="ad-manage-card">
                            <div className="ad-card-img">
                                <img src={p.images[0]} alt="" />
                                <div className={`ad-status-overlay ${p.status}`}>
                                    {p.status === 'pending' && <Clock size={14} />}
                                    {p.status === 'approved' && <CheckCircle size={14} />}
                                    {p.status === 'rejected' && <AlertCircle size={14} />}
                                    {p.status}
                                </div>
                            </div>
                            <div className="ad-card-info">
                                <div className="ad-card-main">
                                    <h3 className="ad-card-title">{p.title}</h3>
                                    <span className="ad-card-price">₹{p.price.toLocaleString()}</span>
                                    <div className="ad-card-meta">
                                        <span>{p.category?.name}</span>
                                        <span className="dot" />
                                        <span>{p.location?.name}</span>
                                    </div>
                                </div>
                                <div className="ad-card-actions">
                                    {p.isPromoted ? (
                                        <div className="promoted-badge">
                                            <TrendingUp size={14} /> 
                                            <span>Promoted until {new Date(p.promotionExpiry).toLocaleDateString()}</span>
                                        </div>
                                    ) : (
                                        p.status === 'approved' && (
                                            <button 
                                                className="promote-btn-action"
                                                onClick={() => setShowPromo(p)}
                                            >
                                                <TrendingUp size={14} /> Promote Now
                                            </button>
                                        )
                                    )}
                                    <button className="view-ad-link">Edit Details <ChevronRight size={14} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showPromo && (
                <PromotionModal 
                    product={showPromo} 
                    onClose={() => setShowPromo(null)} 
                    onSuccess={handlePromoteSuccess} 
                />
            )}
        </div>
    );
}

// Internal Promotion Modal Component for simplicity in this turn
function PromotionModal({ product, onClose, onSuccess }) {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [offers, setOffers] = useState([]);
    const [stage, setStage] = useState('select'); // select, payment, success

    useEffect(() => {
        const fetchOffers = async () => {
            const { data } = await axios.get('http://localhost:5000/api/admin/offers');
            setOffers(data);
        };
        fetchOffers();
    }, []);

    const handlePayment = async () => {
        setStage('payment');
        setTimeout(async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.put(`http://localhost:5000/api/products/${product._id}/promote`, {
                    days: selectedOffer.duration,
                    amount: selectedOffer.price
                }, config);
                setStage('success');
            } catch (err) {
                console.error(err);
                setStage('select');
            }
        }, 2000);
    };

    return (
        <div className="promo-overlay" onClick={onClose}>
            <div className="promo-modal" onClick={e => e.stopPropagation()}>
                {stage === 'select' && (
                    <>
                        <h2>Promote Your Ad</h2>
                        <p>Get up to 10x more views and sell faster!</p>
                        <div className="offers-list-promo">
                            {offers.map(o => (
                                <div 
                                    key={o._id} 
                                    className={`offer-item-promo ${selectedOffer?._id === o._id ? 'active' : ''}`}
                                    onClick={() => setSelectedOffer(o)}
                                >
                                    <div className="offer-p-title">{o.name}</div>
                                    <div className="offer-p-days">{o.duration} Days</div>
                                    <div className="offer-p-price">₹{o.price}</div>
                                </div>
                            ))}
                        </div>
                        <button 
                            className="promo-pay-btn" 
                            disabled={!selectedOffer}
                            onClick={handlePayment}
                        >
                            Proceed to Payment
                        </button>
                    </>
                )}

                {stage === 'payment' && (
                    <div className="promo-loading">
                        <div className="spinner" />
                        <h3>Processing Payment...</h3>
                        <p>Please do not refresh the page</p>
                    </div>
                )}

                {stage === 'success' && (
                    <div className="promo-success">
                        <CheckCircle size={48} color="#10B981" />
                        <h3>Payment Successful!</h3>
                        <p>Your ad "{product.title}" is now promoted.</p>
                        <button className="promo-pay-btn" onClick={onSuccess}>Done</button>
                    </div>
                )}
            </div>
        </div>
    );
}
