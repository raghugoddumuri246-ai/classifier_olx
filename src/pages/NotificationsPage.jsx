import { Bell, Package, Trash2, Check, Tag, Star, MessageCircle, Eye } from 'lucide-react';
import '../styles/NotificationsPage.css';

const mockNotifications = [
    { id: 1, type: 'offer', icon: '💰', title: 'New offer on your ad', desc: 'Someone made an offer of ₹85,000 on "Royal Enfield Classic 350"', time: '2 min ago', read: false },
    { id: 2, type: 'message', icon: '💬', title: 'New message from Arjun M.', desc: '"Is this still available? Can you do ₹45k?"', time: '18 min ago', read: false },
    { id: 3, type: 'view', icon: '👁️', title: 'Your ad got 120 new views', desc: '"3 BHK Sea Facing Flat, Mumbai" is trending in your area', time: '1 hr ago', read: false },
    { id: 4, type: 'saved', icon: '⭐', title: 'Someone saved your listing', desc: '"MacBook Pro M3 — ₹1.89L" was added to a buyer\'s wishlist', time: '3 hrs ago', read: true },
    { id: 5, type: 'promo', icon: '🚀', title: 'Boost your ad for free today', desc: 'Get 5× more visibility on your listing. Limited time offer.', time: 'Yesterday', read: true },
    { id: 6, type: 'offer', icon: '💰', title: 'Counter offer received', desc: 'Priya K. countered with ₹1.1L for your "iPhone 15 Pro Max"', time: 'Yesterday', read: true },
    { id: 7, type: 'message', icon: '💬', title: 'New message from Ramesh V.', desc: '"Can we meet tomorrow at 10 AM at MG Road?"', time: '2 days ago', read: true },
    { id: 8, type: 'view', icon: '👁️', title: 'Your ad got 400+ views', desc: '"Honda City 2021" is one of the most viewed cars this week', time: '3 days ago', read: true },
];

const typeColor = { offer: '#23E5DB', message: '#4776E6', view: '#56AB2F', saved: '#FFB300', promo: '#FC5C7D' };

export default function NotificationsPage() {
    const unread = mockNotifications.filter(n => !n.read).length;

    return (
        <div className="notif-page">
            <div className="container">
                <div className="notif-header">
                    <div className="notif-title-row">
                        <Bell size={22} className="notif-page-icon" />
                        <h1 className="notif-page-title">Notifications</h1>
                        {unread > 0 && <span className="notif-unread-badge">{unread} new</span>}
                    </div>
                    <div className="notif-actions">
                        <button className="notif-action-btn"><Check size={14} /> Mark all read</button>
                        <button className="notif-action-btn danger"><Trash2 size={14} /> Clear all</button>
                    </div>
                </div>

                <div className="notif-list">
                    {mockNotifications.map((n) => (
                        <div key={n.id} className={`notif-card ${!n.read ? 'unread' : ''}`}>
                            <div className="notif-card-icon" style={{ background: `${typeColor[n.type]}18`, border: `1.5px solid ${typeColor[n.type]}35` }}>
                                <span>{n.icon}</span>
                            </div>
                            <div className="notif-card-body">
                                <div className="notif-card-top">
                                    <span className="notif-card-title">{n.title}</span>
                                    <span className="notif-card-time">{n.time}</span>
                                </div>
                                <p className="notif-card-desc">{n.desc}</p>
                            </div>
                            {!n.read && <div className="notif-unread-dot" />}
                        </div>
                    ))}
                </div>

                <div className="notif-empty-hint">
                    <Bell size={18} />
                    <span>You're all caught up! Check back later for new updates.</span>
                </div>
            </div>
        </div>
    );
}
