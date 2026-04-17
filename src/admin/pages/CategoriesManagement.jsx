import { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, Tag } from 'lucide-react';
import axios from 'axios';
import '../styles/AdminPages.css';

export default function CategoriesManagement() {
    const [categories, setCategories] = useState([]);
    const [newCat, setNewCat] = useState({ name: '', icon: '' });
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:5000/api/categories');
            setCategories(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            await axios.post('http://localhost:5000/api/admin/categories', newCat, config);
            setNewCat({ name: '', icon: '' });
            fetchCategories();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="admin-loading">Loading Categories...</div>;

    return (
        <div className="admin-page-content animate-in">
            <header className="admin-content-header">
                <div>
                    <h1 className="admin-page-title">Categories Management</h1>
                    <p className="admin-page-sub">Add or edit product categories</p>
                </div>
            </header>

            <div className="content-mgmt-grid">
                {/* Form */}
                <div className="mgmt-card">
                    <h3>Add New Category</h3>
                    <form onSubmit={handleAdd} className="mgmt-form">
                        <div className="form-group">
                            <label>Category Name</label>
                            <input 
                                type="text" 
                                value={newCat.name}
                                onChange={e => setNewCat({ ...newCat, name: e.target.value })}
                                placeholder="e.g. Health & Beauty"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Icon (Emoji or Icon Name)</label>
                            <input 
                                type="text" 
                                value={newCat.icon}
                                onChange={e => setNewCat({ ...newCat, icon: e.target.value })}
                                placeholder="e.g. 💄"
                                required
                            />
                        </div>
                        <button type="submit" className="admin-primary-btn w-full">
                            <Plus size={16} /> Add Category
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="mgmt-card">
                    <h3>Current Categories</h3>
                    <div className="cat-list-admin">
                        {categories.map(c => (
                            <div key={c._id} className="cat-item-admin">
                                <div className="cat-icon-admin">{c.icon}</div>
                                <div className="cat-name-admin">{c.name}</div>
                                <div className="cat-actions-admin">
                                    <button className="icon-btn-danger"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .content-mgmt-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                    gap: 30px;
                }
                .mgmt-card {
                    background: var(--bg-card);
                    padding: 24px;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-card);
                    border: 1px solid var(--border);
                }
                .mgmt-card h3 {
                    font-size: 16px;
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid var(--border);
                }
                .mgmt-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .mgmt-form input {
                    padding: 10px 14px;
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    width: 100%;
                }
                .cat-list-admin {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    max-height: 500px;
                    overflow-y: auto;
                }
                .cat-item-admin {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px;
                    background: var(--bg-main);
                    border-radius: var(--radius-md);
                }
                .cat-icon-admin {
                    font-size: 20px;
                    width: 40px;
                    height: 40px;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }
                .cat-name-admin {
                    font-weight: 600;
                    flex: 1;
                }
                .icon-btn-danger {
                    color: #EF4444;
                    padding: 5px;
                }
                .w-full { width: 100%; justify-content: center; }
            `}</style>
        </div>
    );
}
