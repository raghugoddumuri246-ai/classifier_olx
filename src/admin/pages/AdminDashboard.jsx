import { useState, useEffect } from 'react';
import { Users, Package, CreditCard, Layout, Layers, MapPin, Tag, TrendingUp } from 'lucide-react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        payments: 0,
        categories: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                    }
                };
                
                const [uRes, pRes, payRes, catRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/users', config),
                    axios.get('http://localhost:5000/api/admin/products', config),
                    axios.get('http://localhost:5000/api/admin/payments', config),
                    axios.get('http://localhost:5000/api/categories')
                ]);

                setStats({
                    users: uRes.data.total,
                    products: pRes.data.length,
                    payments: payRes.data.length,
                    categories: catRes.data.length
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Users', value: stats.users, icon: Users, color: '#4285F4' },
        { label: 'All Products', value: stats.products, icon: Package, color: '#34A853' },
        { label: 'Total Payments', value: stats.payments, icon: CreditCard, color: '#FBBC04' },
        { label: 'Categories', value: stats.categories, icon: Layers, color: '#EA4335' }
    ];

    if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

    return (
        <div className="admin-page-content">
            <header className="admin-content-header">
                <div>
                    <h1 className="admin-page-title">Dashboard Overview</h1>
                    <p className="admin-page-sub">Performance metrics and platform stats</p>
                </div>
                <div className="admin-header-actions">
                    <button className="admin-primary-btn">
                        <TrendingUp size={16} />
                        View Analytics
                    </button>
                </div>
            </header>

            <div className="admin-stats-grid">
                {statCards.map((s, i) => (
                    <div key={i} className="admin-stat-card">
                        <div className="stat-icon-wrap" style={{ backgroundColor: `${s.color}20`, color: s.color }}>
                            <s.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">{s.label}</span>
                            <span className="stat-value">{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
