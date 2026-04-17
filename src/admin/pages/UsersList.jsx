import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, ChevronLeft, ChevronRight, User as UserIcon } from 'lucide-react';
import axios from 'axios';
import '../styles/AdminPages.css';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const { data } = await axios.get(`http://localhost:5000/api/admin/users?pageNumber=${page}`, config);
            setUsers(data.users);
            setPages(data.pages);
            setTotal(data.total);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="admin-loading">Loading Users...</div>;

    return (
        <div className="admin-page-content animate-in">
            <header className="admin-content-header">
                <div>
                    <h1 className="admin-page-title">Users Management</h1>
                    <p className="admin-page-sub">Total {total} users registered on the platform</p>
                </div>
                <div className="admin-header-actions">
                    <div className="search-box-premium">
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User Details</th>
                            <th>Contact Info</th>
                            <th>Joined Date</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(u => (
                            <tr key={u._id}>
                                <td>
                                    <div className="table-user-cell">
                                        <div className="table-avatar"><UserIcon size={14} /></div>
                                        <div className="user-name-wrap">
                                            <strong>{u.name}</strong>
                                            <span>ID: {u._id.substring(18)}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-cell">
                                        <div className="contact-item"><Mail size={12} /> {u.email}</div>
                                        <div className="contact-item"><Phone size={12} /> {u.phone}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="date-cell">
                                        <Calendar size={12} /> {new Date(u.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td>
                                    <span className={`role-badge ${u.role}`}>{u.role}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pages > 1 && !searchTerm && (
                <div className="admin-pagination">
                    <button 
                        disabled={page === 1} 
                        onClick={() => setPage(page - 1)}
                        className="pagi-btn"
                    >
                        <ChevronLeft size={16} /> Previous
                    </button>
                    <span className="pagi-info">Page {page} of {pages}</span>
                    <button 
                        disabled={page === pages} 
                        onClick={() => setPage(page + 1)}
                        className="pagi-btn"
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            )}

            <style>{`
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
                .search-box-premium:focus-within {
                    border-color: var(--primary);
                    box-shadow: var(--shadow-sm);
                }
                .search-box-premium input {
                    border: none;
                    background: transparent;
                    width: 100%;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--text-primary);
                }
                .search-box-premium input:focus { outline: none; }
                
                .role-badge {
                    padding: 4px 10px;
                    border-radius: 50px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .role-badge.admin {
                    background: rgba(49, 130, 206, 0.1);
                    color: var(--primary);
                }
                .role-badge.user {
                    background: rgba(113, 128, 150, 0.1);
                    color: var(--text-muted);
                }
            `}</style>
        </div>
    );
}
