import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';
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
                        <h4>Popular Categories</h4>
                        <ul>
                            {['Cars & Vehicles', 'Property & Real Estate', 'Mobile Phones', 'Electronics', 'Bikes & Motorcycles', 'Furniture'].map((item) => (
                                <li key={item}><a href="#">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h4>Company</h4>
                        <ul>
                            {['About OLX', 'Careers', 'Press & Media', 'Safety Tips', 'Blog', 'Partner Program'].map((item) => (
                                <li key={item}><a href="#">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h4>Support</h4>
                        <ul>
                            {['Help Center', 'Terms of Use', 'Privacy Policy', 'Cookie Policy', 'Accessibility', 'Report Abuse'].map((item) => (
                                <li key={item}><a href="#">{item}</a></li>
                            ))}
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
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Cookies</a>
                    </div>
                    <button className="scroll-top-btn" onClick={scrollTop} title="Back to top">
                        <ArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
