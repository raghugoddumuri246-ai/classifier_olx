import { useState, useEffect } from 'react';
import { Tag, Plus, TrendingUp } from 'lucide-react';
import axios from 'axios';
import '../styles/AdminPages.css';

export default function OffersManagement() {
    const [offers, setOffers] = useState([]);
    const [newOffer, setNewOffer] = useState({ name: '', duration: '', price: '', description: '' });
    const [loading, setLoading] = useState(true);

    const fetchOffers = async () => {
        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const { data } = await axios.get('http://localhost:5000/api/admin/offers', config);
            setOffers(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            await axios.post('http://localhost:5000/api/admin/offers', newOffer, config);
            setNewOffer({ name: '', duration: '', price: '', description: '' });
            fetchOffers();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="admin-loading">Loading Offers...</div>;

    return (
        <>
            <div className="admin-page-content animate-in">
                <header className="admin-content-header">
                    <div>
                        <h1 className="admin-page-title">Offers & Pricing</h1>
                        <p className="admin-page-sub">Configure promotion packages and costs</p>
                    </div>
                </header>

                <div className="offers-premium-container">
                    {/* Add Form Card */}
                    <div className="mgmt-card add-offer-card">
                        <div className="card-header-premium">
                            <Tag className="header-icon" />
                            <div>
                                <h3>Create New Promotion</h3>
                                <p>Set pricing and features for ad boost plans</p>
                            </div>
                        </div>

                        <form onSubmit={handleAdd} className="premium-offer-form">
                            <div className="form-row">
                                <div className="form-group flex-2">
                                    <label>Plan Name</label>
                                    <input 
                                        type="text" 
                                        value={newOffer.name}
                                        onChange={e => setNewOffer({ ...newOffer, name: e.target.value })}
                                        placeholder="e.g. Premium Boost"
                                        required
                                    />
                                </div>
                                <div className="form-group flex-1">
                                    <label>Price (₹)</label>
                                    <input 
                                        type="number" 
                                        value={newOffer.price}
                                        onChange={e => setNewOffer({ ...newOffer, price: e.target.value })}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group flex-1">
                                    <label>Duration (Days)</label>
                                    <select 
                                        value={newOffer.duration}
                                        onChange={e => setNewOffer({ ...newOffer, duration: e.target.value })}
                                        className="premium-select"
                                    >
                                        <option value="">Select Duration</option>
                                        <option value="1">1 Day</option>
                                        <option value="3">3 Days</option>
                                        <option value="7">7 Days</option>
                                        <option value="15">15 Days</option>
                                        <option value="30">30 Days</option>
                                    </select>
                                </div>
                                <div className="form-group flex-2">
                                    <label>Included Features (comma separated)</label>
                                    <input 
                                        type="text" 
                                        value={newOffer.description}
                                        onChange={e => setNewOffer({ ...newOffer, description: e.target.value })}
                                        placeholder="Fast view, Featured badge, etc."
                                    />
                                </div>
                            </div>

                            <button type="submit" className="premium-submit-btn">
                                <Plus size={18} /> Generate Plan
                            </button>
                        </form>
                    </div>

                    {/* Active Plans Grid */}
                    <div className="active-plans-header">
                        <h3>Active Promotion Plans</h3>
                        <p>Currently available to users</p>
                    </div>

                    <div className="plans-grid-premium">
                        {offers.length === 0 ? (
                            <div className="empty-plans">No plans configured yet.</div>
                        ) : offers.map((o, i) => (
                            <div key={o._id} className={`premium-plan-card animate-in ${i === 1 ? 'featured-plan' : ''}`} style={{ animationDelay: `${i * 0.15}s` }}>
                                {i === 1 && <div className="popular-ribbon">MOST POPULAR</div>}
                                <div className="plan-badge-status">ACTIVE</div>
                                <h4 className="plan-name-premium">{o.name}</h4>
                                <div className="plan-price-premium">
                                    <span className="curr">₹</span>
                                    <span className="amt">{o.price}</span>
                                    <span className="dur">/ {o.duration} Days</span>
                                </div>
                                
                                <ul className="plan-features-premium">
                                    {o.description && o.description.split(',').map((f, idx) => (
                                        <li key={idx}>
                                            <div className="check-icon-wrapper">
                                                <TrendingUp size={12} />
                                            </div>
                                            {f.trim()}
                                        </li>
                                    ))}
                                </ul>

                                <div className="plan-actions-premium">
                                    <button className="btn-edit-secondary">Configure</button>
                                    <button 
                                        className="btn-delete-icon"
                                        onClick={() => {
                                            if(window.confirm('Delete this plan?')) {
                                                // Handle delete
                                            }
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .offers-premium-container {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }
                .card-header-premium {
                    display: flex;
                    gap: 18px;
                    align-items: center;
                    margin-bottom: 25px;
                }
                .header-icon {
                    width: 52px;
                    height: 52px;
                    padding: 12px;
                    background: linear-gradient(135deg, var(--primary), #4299e1);
                    color: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 15px -3px rgba(49, 130, 206, 0.3);
                }
                
                .premium-offer-form .form-row {
                    display: flex;
                    gap: 24px;
                    margin-bottom: 20px;
                }
                .premium-select {
                    width: 100%;
                    padding: 12px 16px;
                    background: var(--bg-main);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-primary);
                }

                .premium-submit-btn {
                    background: linear-gradient(to right, var(--primary), #3182ce);
                    color: white;
                    width: 100%;
                    padding: 16px;
                    border-radius: 14px;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    box-shadow: 0 4px 14px 0 rgba(49, 130, 206, 0.39);
                    transition: all 0.3s ease;
                }
                .premium-submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(49, 130, 206, 0.45);
                    filter: brightness(1.1);
                }

                .plans-grid-premium {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 30px;
                }
                
                .premium-plan-card {
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 24px;
                    padding: 40px 30px;
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                }
                .premium-plan-card:hover {
                    transform: translateY(-15px);
                    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3);
                    border-color: var(--primary);
                }

                .featured-plan {
                    border: 2px solid var(--primary);
                    background: linear-gradient(to bottom, #ffffff, #f7fafc);
                }

                .popular-ribbon {
                    position: absolute;
                    top: 20px;
                    right: -35px;
                    background: #ffcc00;
                    color: #000;
                    font-size: 10px;
                    font-weight: 900;
                    padding: 6px 40px;
                    transform: rotate(45deg);
                    box-shadow: var(--shadow-sm);
                }

                .plan-badge-status {
                    font-size: 10px;
                    font-weight: 800;
                    color: var(--primary);
                    background: rgba(49, 130, 206, 0.08);
                    padding: 4px 12px;
                    border-radius: 50px;
                    width: fit-content;
                    margin-bottom: 20px;
                }

                .plan-name-premium {
                    font-size: 22px;
                    font-weight: 900;
                    color: #1a202c;
                    margin-bottom: 15px;
                }

                .plan-price-premium {
                    display: flex;
                    align-items: baseline;
                    gap: 5px;
                    margin-bottom: 30px;
                }
                .curr { font-size: 20px; font-weight: 700; color: #4a5568; }
                .amt { font-size: 44px; font-weight: 900; color: var(--primary); letter-spacing: -1px; }
                .dur { font-size: 14px; font-weight: 600; color: #718096; }

                .plan-features-premium {
                    list-style: none;
                    margin-bottom: 40px;
                }
                .plan-features-premium li {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #4a5568;
                    margin-bottom: 16px;
                }
                .check-icon-wrapper {
                    width: 22px;
                    height: 22px;
                    background: rgba(52, 168, 83, 0.1);
                    color: #34A853;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .plan-actions-premium {
                    display: flex;
                    gap: 12px;
                }
                .btn-edit-secondary {
                    flex: 1;
                    padding: 12px;
                    background: var(--bg-main);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 700;
                    transition: all 0.2s;
                }
                .btn-edit-secondary:hover { background: #edf2f7; transform: scale(1.02); }
                
                .btn-delete-icon {
                    width: 48px;
                    background: #fff5f5;
                    color: #e53e3e;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .btn-delete-icon:hover { background: #feb2b2; color: #c53030; }

                .empty-plans {
                    text-align: center;
                    padding: 80px;
                    background: var(--bg-main);
                    border-radius: 20px;
                    border: 3px dashed var(--border);
                    color: var(--text-muted);
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}
