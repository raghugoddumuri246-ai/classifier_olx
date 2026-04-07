import { useState } from 'react';
import { MapPin, ChevronDown, Menu, X, Plus, User, Search, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { locations } from '../data/listings';
import '../styles/Navbar.css';

export default function Navbar({ onSearch, onLocationChange, selectedLocation, onLoginClick, onSellClick, wishlistCount = 0 }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isDark, setIsDark] = useState(false);
    const navigate = useNavigate();
    const loc = useLocation();
    const isHome = loc.pathname === '/';

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!isHome) navigate('/');
        if (onSearch) onSearch(query);
        setTimeout(() => {
            const el = document.getElementById('listings-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
    };

    return (
        <header className="navbar">
            <div className="navbar-inner container">
                {/* Logo */}
                <a href="/" className="navbar-logo" onClick={e => { e.preventDefault(); navigate('/'); }}>
                    <div className="logo-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10l-5 8z" /></svg>
                    </div>
                    <span className="logo-olx">OLX</span>
                    <span className="logo-dot">.</span>
                    <span className="logo-in">in</span>
                </a>

                {/* Location Selector */}
                <div className="navbar-location" onClick={() => setLocationOpen(!locationOpen)}>
                    <MapPin size={15} className="location-icon" />
                    <div className="location-info">
                        <span className="location-hint">Your city</span>
                        <span className="location-text">{selectedLocation}</span>
                    </div>
                    <ChevronDown size={13} className={`chevron ${locationOpen ? 'open' : ''}`} />
                    {locationOpen && (
                        <div className="location-dropdown">
                            <div className="dropdown-header">Select City</div>
                            {locations.map((l) => (
                                <div
                                    key={l}
                                    className={`location-item ${selectedLocation === l ? 'active' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); onLocationChange(l); setLocationOpen(false); }}
                                >
                                    <MapPin size={13} />
                                    {l}
                                    {selectedLocation === l && <span className="loc-check">✓</span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <form className="navbar-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder={`Find Cars, Mobile Phones and more in ${selectedLocation}...`}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                    <button type="submit" className="search-btn">
                        <Search size={20} />
                    </button>
                </form>

                {/* Nav Actions */}
                <nav className="navbar-actions">
                    <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
                        {isDark ? <Sun size={19} /> : <Moon size={19} />}
                    </button>
                    <div className="nav-divider" />
                    <button className="login-btn" onClick={onLoginClick}>
                        <div className="avatar-ring"><User size={14} /></div>
                        <div className="login-text">
                            <span className="login-hint">Account</span>
                            <span className="login-label">Login</span>
                        </div>
                    </button>
                    <button className="sell-btn" onClick={onSellClick}>
                        <Plus size={15} strokeWidth={2.5} />
                        <span>Sell Now</span>
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-actions">
                        <button className="mobile-login-btn" onClick={() => { onLoginClick(); setMenuOpen(false); }}><User size={15} /> Login</button>
                        <button className="mobile-sell-btn" onClick={() => { onSellClick(); setMenuOpen(false); }}><Plus size={15} /> Sell Now</button>
                    </div>
                </div>
            )}
        </header>
    );
}
