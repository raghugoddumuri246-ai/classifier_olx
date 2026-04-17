import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import axios from 'axios';
import '../styles/AdminLogin.css';

export default function AdminLoginPage({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            if (data.role !== 'admin') {
                setError('Access denied. You do not have administrator privileges.');
                setLoading(false);
                return;
            }

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-bg">
                <div className="blur-blob"></div>
                <div className="blur-blob secondary"></div>
            </div>

            <div className="admin-login-card animate-in">
                <div className="admin-login-header">
                    <div className="admin-logo-ring">
                        <Shield className="admin-logo-icon" size={32} />
                    </div>
                    <h1>Admin Console</h1>
                    <p>Secure authentication for platform management</p>
                </div>

                <form className="admin-login-form" onSubmit={handleLogin}>
                    {error && (
                        <div className="admin-login-error">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="admin-input-group">
                        <label>Email Address</label>
                        <div className="admin-input-wrap">
                            <Mail className="input-icon" size={18} />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-input-group">
                        <label>Password</label>
                        <div className="admin-input-wrap">
                            <Lock className="input-icon" size={18} />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button className="admin-submit-btn" disabled={loading}>
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <span>Authenticate</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                    
                    <div className="admin-login-footer">
                        <p>Trouble logging in? Contact system administrator.</p>
                    </div>
                </form>
            </div>
            
            <button className="back-to-site" onClick={() => navigate('/')}>
                Return to Website
            </button>
        </div>
    );
}
