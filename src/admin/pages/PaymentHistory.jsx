import { useState, useEffect } from 'react';
import { CreditCard, Calendar, User, Search, Filter } from 'lucide-react';
import axios from 'axios';
import '../styles/AdminPages.css';

export default function PaymentHistory() {
    const [payments, setPayments] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const { data } = await axios.get(`http://localhost:5000/api/admin/payments?filter=${filter}`, config);
            setPayments(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [filter]);

    if (loading) return <div className="admin-loading">Loading Payments...</div>;

    return (
        <div className="admin-page-content animate-in">
            <header className="admin-content-header">
                <div>
                    <h1 className="admin-page-title">Payment History</h1>
                    <p className="admin-page-sub">Track all promotion transactions on the platform</p>
                </div>
                <div className="admin-header-actions">
                    <div className="filter-group">
                        <Filter size={16} />
                        <select 
                            value={filter} 
                            onChange={(e) => setFilter(e.target.value)}
                            className="admin-select"
                        >
                            <option value="all">All Time</option>
                            <option value="daily">Daily</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>
            </header>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p._id}>
                                <td><code className="text-muted">TXN-{p._id.substring(18)}</code></td>
                                <td>
                                    <div className="contact-cell">
                                        <div className="contact-item"><User size={12} /> {p.user?.name}</div>
                                        <div className="contact-item text-xs">{p.user?.email}</div>
                                    </div>
                                </td>
                                <td>{p.product?.title || 'Product Deleted'}</td>
                                <td><strong>₹{p.amount}</strong></td>
                                <td>{p.promotionDuration} Days</td>
                                <td>
                                    <div className="date-cell">
                                        <Calendar size={12} /> {new Date(p.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge completed`}>Success</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {payments.length === 0 && (
                <div className="no-data-msg">No payments found for this period.</div>
            )}

            <style>{`
                .filter-group {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: var(--bg-card);
                    padding: 8px 16px;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border);
                }
                .admin-select {
                    border: none;
                    background: none;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-primary);
                    outline: none;
                }
                .no-data-msg {
                    text-align: center;
                    padding: 40px;
                    color: var(--text-muted);
                    font-weight: 500;
                }
                .text-xs { font-size: 11px; }
            `}</style>
        </div>
    );
}
