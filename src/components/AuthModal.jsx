import { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Loader } from 'lucide-react';
import '../styles/AuthModal.css';

function InputField({ icon: Icon, type = 'text', placeholder, value, onChange, name, rightEl }) {
    return (
        <div className="input-wrap">
            <span className="input-icon"><Icon size={16} /></span>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                className="auth-input"
                autoComplete="off"
            />
            {rightEl && <span className="input-right">{rightEl}</span>}
        </div>
    );
}

export default function AuthModal({ mode: initialMode = 'login', onClose }) {
    const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
    const [submitted, setSubmitted] = useState(false);

    const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1400);
    };

    const switchMode = (m) => {
        setMode(m);
        setForm({ name: '', email: '', phone: '', password: '' });
        setSubmitted(false);
        setShowPassword(false);
    };

    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>

                {/* Left panel */}
                <div className="auth-left">
                    <div className="auth-brand">
                        <span className="auth-logo-olx">OLX</span>
                        <span className="auth-logo-dot">.</span>
                        <span className="auth-logo-in">in</span>
                    </div>
                    <h2 className="auth-tagline">
                        {mode === 'login' ? 'Welcome back!' : 'Join millions of buyers &amp; sellers'}
                    </h2>
                    <p className="auth-panel-desc">
                        {mode === 'login'
                            ? 'Sign in to access your wishlist, manage listings, and chat with buyers.'
                            : 'Create a free account in seconds and start buying or selling anything.'}
                    </p>

                    <div className="auth-perks">
                        {['Free to list anything', 'Verified buyers & sellers', 'Secure transactions', 'Chat directly'].map((p) => (
                            <div key={p} className="auth-perk">
                                <span className="perk-dot" />
                                {p}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right panel */}
                <div className="auth-right">
                    {/* Close */}
                    <button className="auth-close" onClick={onClose}><X size={18} /></button>

                    {/* Tabs */}
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                            onClick={() => switchMode('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                            onClick={() => switchMode('signup')}
                        >
                            Sign Up
                        </button>
                    </div>

                    {submitted ? (
                        <div className="auth-success">
                            <div className="success-circle">✓</div>
                            <h3>{mode === 'login' ? 'Logged in!' : 'Account created!'}</h3>
                            <p>{mode === 'login' ? 'Welcome back to OLX.' : 'Welcome aboard! Happy buying & selling.'}</p>
                            <button className="auth-submit-btn" onClick={onClose}>
                                Continue <ArrowRight size={15} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="auth-form-header">
                                <h3 className="auth-form-title">
                                    {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
                                </h3>
                                <p className="auth-form-sub">
                                    {mode === 'login'
                                        ? "Don't have an account? "
                                        : 'Already have an account? '}
                                    <button onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')} className="auth-switch-link">
                                        {mode === 'login' ? 'Sign up free' : 'Login'}
                                    </button>
                                </p>
                            </div>

                            <form className="auth-form" onSubmit={handleSubmit}>
                                {mode === 'signup' && (
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <InputField
                                            icon={User}
                                            name="name"
                                            placeholder="Rahul Sharma"
                                            value={form.name}
                                            onChange={update}
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <InputField
                                        icon={Mail}
                                        type="email"
                                        name="email"
                                        placeholder="you@email.com"
                                        value={form.email}
                                        onChange={update}
                                    />
                                </div>

                                {mode === 'signup' && (
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <InputField
                                            icon={Phone}
                                            type="tel"
                                            name="phone"
                                            placeholder="+91 98765 43210"
                                            value={form.phone}
                                            onChange={update}
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <div className="label-row">
                                        <label className="form-label">Password</label>
                                        {mode === 'login' && (
                                            <button type="button" className="forgot-link">Forgot password?</button>
                                        )}
                                    </div>
                                    <InputField
                                        icon={Lock}
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={update}
                                        rightEl={
                                            <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        }
                                    />
                                    {mode === 'signup' && (
                                        <p className="password-hint">Min. 8 characters with a number and symbol.</p>
                                    )}
                                </div>

                                {mode === 'signup' && (
                                    <label className="terms-check">
                                        <input type="checkbox" required />
                                        <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                                    </label>
                                )}

                                <button type="submit" className="auth-submit-btn" disabled={loading}>
                                    {loading
                                        ? <><Loader size={15} className="spin" /> {mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
                                        : <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={15} /></>
                                    }
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="auth-divider"><span>or continue with</span></div>

                            {/* Social buttons */}
                            <div className="social-auth">
                                <button className="social-btn google-btn">
                                    <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.3 9 3.4l6.7-6.7C35.5 2.5 30.1 0 24 0 14.6 0 6.7 5.6 2.9 13.7l7.8 6.1C12.5 13.3 17.8 9.5 24 9.5z" /><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.4c-.5 2.7-2.1 5-4.5 6.5l7 5.4C43.1 37 46.1 31.2 46.1 24.5z" /><path fill="#FBBC04" d="M10.7 28.2C10.2 26.8 10 25.4 10 24s.2-2.8.7-4.2L2.9 13.7C1.1 17.1 0 20.9 0 24s1.1 6.9 2.9 10.3l7.8-6.1z" /><path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.4l-7-5.4c-2 1.3-4.6 2.1-7.9 2.1-6.2 0-11.5-3.8-13.3-9.1l-7.8 6.1C6.7 42.4 14.6 48 24 48z" /></svg>
                                    Google
                                </button>
                                <button className="social-btn phone-btn">
                                    <Phone size={16} />
                                    Mobile OTP
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
