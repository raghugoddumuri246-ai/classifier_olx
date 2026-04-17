import { useState, useEffect } from 'react';
import { Check, X, Eye, Package, User, MapPin, Tag, Calendar } from 'lucide-react';
import axios from 'axios';
import '../styles/AdminPages.css';

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const { data } = await axios.get('http://localhost:5000/api/admin/products', config);
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            await axios.put(`http://localhost:5000/api/admin/products/${id}/status`, { status }, config);
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'all' || p.status === activeTab;
        return matchesSearch && matchesTab;
    });

    if (loading) return <div className="admin-loading">Loading Products...</div>;

    return (
        <div className="admin-page-content animate-in">
            <header className="admin-content-header">
                <div>
                    <h1 className="admin-page-title">Products Management</h1>
                    <p className="admin-page-sub">Review and approve listings on the platform</p>
                </div>
                <div className="admin-header-actions">
                    <div className="search-box-premium">
                        <input 
                            type="text" 
                            placeholder="Search listings..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="admin-tabs-row">
                <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Products</button>
                <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>Pending <span className="tab-count">{products.filter(p => p.status === 'pending').length}</span></button>
                <button className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>Approved</button>
                <button className={`tab-btn ${activeTab === 'rejected' ? 'active' : ''}`} onClick={() => setActiveTab('rejected')}>Rejected</button>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product Info</th>
                            <th>Seller</th>
                            <th>Category/Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(p => (
                            <tr key={p._id}>
                                <td>
                                    <div className="table-user-cell">
                                        <div className="product-img-mini">
                                            <img src={p.images[0]} alt="" />
                                        </div>
                                        <div className="user-name-wrap">
                                            <strong>{p.title}</strong>
                                            <span>₹{p.price.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-cell">
                                        <div className="contact-item"><User size={12} /> {p.user?.name}</div>
                                        <div className="contact-item"><Package size={12} /> {p.condition}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-cell">
                                        <div className="contact-item"><Tag size={12} /> {p.category?.name}</div>
                                        <div className="contact-item"><MapPin size={12} /> {p.location?.name}</div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${p.status}`}>{p.status}</span>
                                    {p.isPromoted && <span className="promo-badge-small">PROMOTED</span>}
                                </td>
                                <td>
                                    <div className="table-actions">
                                        {p.status === 'pending' && (
                                            <>
                                                <button 
                                                    className="action-btn approve" 
                                                    title="Approve"
                                                    onClick={() => updateStatus(p._id, 'approved')}
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button 
                                                    className="action-btn reject" 
                                                    title="Reject"
                                                    onClick={() => updateStatus(p._id, 'rejected')}
                                                >
                                                    <X size={18} />
                                                </button>
                                            </>
                                        )}
                                        <button className="action-btn view" title="View Details">
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .admin-tabs-row {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 25px;
                    border-bottom: 1px solid var(--border);
                    padding-bottom: 2px;
                }
                .tab-btn {
                    padding: 10px 20px;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-muted);
                    position: relative;
                    transition: var(--transition);
                }
                .tab-btn.active {
                    color: var(--primary);
                }
                .tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: var(--primary);
                }
                .tab-count {
                    background: rgba(49, 130, 206, 0.1);
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 11px;
                    margin-left: 4px;
                }
                
                .product-img-mini {
                    width: 48px;
                    height: 48px;
                    border-radius: var(--radius-sm);
                    overflow: hidden;
                    background: var(--bg-main);
                }
                .product-img-mini img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .promo-badge-small {
                    display: block;
                    width: fit-content;
                    font-size: 9px;
                    font-weight: 800;
                    background: #FFCE32;
                    color: #002F34;
                    padding: 2px 5px;
                    border-radius: 3px;
                    margin-top: 5px;
                }
                
                .status-badge.approved { background: rgba(52, 168, 83, 0.1); color: #34A853; }
                .status-badge.pending { background: rgba(251, 188, 5, 0.1); color: #FBBC05; }
                .status-badge.rejected { background: rgba(234, 67, 53, 0.1); color: #EA4335; }

                .search-box-premium {
                    background: var(--bg-main);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    width: 300px;
                    transition: var(--transition);
                }
                .search-box-premium input {
                    border: none;
                    background: transparent;
                    width: 100%;
                    font-size: 14px;
                    font-weight: 500;
                }
                .search-box-premium input:focus { outline: none; }
            `}</style>
        </div>
    );
}
