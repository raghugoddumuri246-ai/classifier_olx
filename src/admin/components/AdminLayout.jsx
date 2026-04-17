import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, Users, Package, CreditCard, 
    Layers, MapPin, Image as ImageIcon, Tag, 
    LogOut, Home, Menu, X 
} from 'lucide-react';
import '../styles/AdminLayout.css';

export default function AdminLayout({ user, onLogout }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/users', icon: Users, label: 'Users List' },
        { path: '/admin/products', icon: Package, label: 'Manage Products' },
        { path: '/admin/payments', icon: CreditCard, label: 'Payment History' },
        { path: '/admin/sliders', icon: ImageIcon, label: 'Hero Sliders' },
        { path: '/admin/categories', icon: Layers, label: 'Categories' },
        { path: '/admin/locations', icon: MapPin, label: 'Locations' },
        { path: '/admin/offers', icon: Tag, label: 'Offers & Pricing' },
    ];

    return (
        <div className={`admin-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <div className="admin-brand">
                        <span className="brand-badge">A</span>
                        <span className="brand-text">Admin Panel</span>
                    </div>
                </div>

                <nav className="admin-nav">
                    <div className="admin-nav-group">
                        <div className="admin-nav-label">Main Menu</div>
                        {menuItems.map(item => (
                            <NavLink 
                                key={item.path} 
                                to={item.path} 
                                end={item.path === '/admin'}
                                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="admin-nav-group mt-auto">
                        <div className="admin-nav-label">System</div>
                        <button className="admin-nav-item" onClick={() => navigate('/')}>
                            <Home size={18} />
                            <span>Main Website</span>
                        </button>
                        <button className="admin-nav-item logout" onClick={onLogout}>
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main">
                <header className="admin-top-bar">
                    <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
                    </button>
                    
                    <div className="admin-top-actions">
                        <div className="admin-user-info">
                            <div className="admin-avatar">{user.name[0]}</div>
                            <div className="admin-details">
                                <span className="admin-name">{user.name}</span>
                                <span className="admin-role">Super Admin</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="admin-content-wrap">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
