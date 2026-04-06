import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-olx">OLX</span>
                            <span className="logo-dot">.</span>
                        </div>
                        <p className="brand-desc">
                            India's largest marketplace for buying and selling. Find great deals on everything from vehicles to electronics.
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer-links-group">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/info/about">About OLX</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/info/terms">Terms of Service</Link></li>
                            <li><Link to="/info/privacy">Privacy Policy</Link></li>
                        </ul>
                        <div className="contact-info">
                            <span><Phone size={13} /> 1800-123-4567</span>
                            <span><Mail size={13} /> support@olx.in</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>© 2024 OLX Group B.V. All Rights Reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/info/privacy">Privacy</Link>
                        <Link to="/info/terms">Terms</Link>
                    </div>
                    <button className="scroll-top-btn" onClick={scrollTop} title="Back to top">
                        <ArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
