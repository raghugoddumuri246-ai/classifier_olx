import { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Trash2, ExternalLink, X, Calendar } from 'lucide-react';
import axios from 'axios';
import '../styles/AdminPages.css';

export default function SliderManagement() {
    const [sliders, setSliders] = useState([]);
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchSliders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:5000/api/sliders');
            setSliders(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSliders();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!imageFile) return alert('Please select an image');

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', imageFile);

            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}` 
                }
            };
            await axios.post('http://localhost:5000/api/admin/sliders', formData, config);
            setTitle('');
            setImageFile(null);
            setImagePreview(null);
            fetchSliders();
        } catch (err) {
            console.error(err);
            alert('Upload failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slider?')) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            await axios.delete(`http://localhost:5000/api/admin/sliders/${id}`, config);
            fetchSliders();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="admin-loading">Loading Sliders...</div>;

    return (
        <>
            <div className="admin-page-content animate-in">
                <header className="admin-content-header">
                    <div>
                        <h1 className="admin-page-title">Hero Sliders</h1>
                        <p className="admin-page-sub">Manage homepage banner images</p>
                    </div>
                </header>

                <div className="content-mgmt-grid">
                    <div className="mgmt-card">
                        <h3>Add New Slider Image</h3>
                        <form onSubmit={handleAdd} className="mgmt-form">
                            <div className="form-group">
                                <label>Banner Title</label>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="e.g. Summer Collection 2024"
                                />
                            </div>

                            <div className="upload-box-wrapper">
                                <label>Background Image</label>
                                <div className={`upload-zone ${imagePreview ? 'has-preview' : ''}`}>
                                    {imagePreview ? (
                                        <div className="preview-container">
                                            <img src={imagePreview} alt="Preview" />
                                            <button type="button" className="remove-preview" onClick={() => {
                                                setImageFile(null);
                                                setImagePreview(null);
                                            }}><X size={16} /></button>
                                        </div>
                                    ) : (
                                        <label className="upload-placeholder">
                                            <ImageIcon size={32} />
                                            <span>Click to upload image</span>
                                            <p>JPG, PNG or WebP</p>
                                            <input type="file" onChange={handleFileChange} hidden accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="admin-primary-btn w-full" disabled={submitting}>
                                {submitting ? 'Uploading...' : (
                                    <><Plus size={16} /> Add Slider</>
                                )}
                            </button>
                        </form>
                    </div>

                            <div className="slider-mgmt-list-premium">
                                {sliders.length === 0 ? (
                                    <div className="empty-sliders-premium">
                                        <ImageIcon size={48} />
                                        <p>No active banners found. Start by uploading one!</p>
                                    </div>
                                ) : sliders.map((s, index) => (
                                    <div key={s._id} className="premium-slider-card animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="slider-preview-container">
                                            <img src={s.imageUrl} alt={s.title} />
                                            <div className="slider-overlay-glass">
                                                <div className="slider-status-pill">
                                                    <div className="pulse-dot"></div>
                                                    LIVE ON SITE
                                                </div>
                                            </div>
                                        </div>
                                        <div className="slider-card-body-premium">
                                            <div className="slider-info-premium">
                                                <h4>{s.title || 'Untitled Banner'}</h4>
                                                <div className="slider-meta-premium">
                                                    <span><Calendar size={12} /> {new Date(s.createdAt).toLocaleDateString()}</span>
                                                    <span><ExternalLink size={12} /> {s.link || 'Internal'}</span>
                                                </div>
                                            </div>
                                            <button 
                                                className="slider-trash-btn-premium"
                                                onClick={() => handleDelete(s._id)}
                                                title="Remove Banner"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                <style>{`
                    .upload-zone {
                        border: 2px dashed var(--border);
                        border-radius: var(--radius-lg);
                        height: 180px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                        background: var(--bg-main);
                        cursor: pointer;
                        overflow: hidden;
                        position: relative;
                    }
                    .upload-zone:hover {
                        border-color: var(--primary);
                        background: rgba(49, 130, 206, 0.05);
                        transform: scale(0.99);
                    }
                    .upload-placeholder {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 12px;
                        color: var(--text-muted);
                    }
                    .upload-placeholder span { font-weight: 700; color: var(--text-primary); font-size: 15px; }

                    .empty-sliders-premium {
                        grid-column: 1 / -1;
                        padding: 80px;
                        background: rgba(255, 255, 255, 0.4);
                        backdrop-filter: blur(8px);
                        border: 2px dashed var(--border);
                        border-radius: var(--radius-xl);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 15px;
                        color: var(--text-muted);
                    }

                    .slider-mgmt-list-premium {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                        gap: 24px;
                    }

                    .premium-slider-card {
                        background: white;
                        border: 1px solid var(--border);
                        border-radius: var(--radius-lg);
                        overflow: hidden;
                        box-shadow: var(--shadow-sm);
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15);
                    }
                    .premium-slider-card:hover {
                        transform: translateY(-10px);
                        box-shadow: var(--shadow-xl);
                        border-color: var(--primary);
                    }

                    .slider-preview-container {
                        position: relative;
                        height: 180px;
                        background: var(--bg-main);
                    }
                    .slider-preview-container img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .slider-overlay-glass {
                        position: absolute;
                        top: 15px;
                        left: 15px;
                    }

                    .slider-status-pill {
                        background: rgba(52, 168, 83, 0.95);
                        backdrop-filter: blur(4px);
                        color: white;
                        font-size: 10px;
                        font-weight: 900;
                        padding: 4px 12px;
                        border-radius: 50px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        box-shadow: var(--shadow-md);
                    }

                    .pulse-dot {
                        width: 8px;
                        height: 8px;
                        background: white;
                        border-radius: 50%;
                        animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    }
                    @keyframes pulse-ring {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.5); opacity: 0.5; }
                        100% { transform: scale(1); opacity: 1; }
                    }

                    .slider-card-body-premium {
                        padding: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .slider-info-premium h4 {
                        font-size: 16px;
                        font-weight: 800;
                        color: var(--text-primary);
                        margin-bottom: 6px;
                    }
                    .slider-meta-premium {
                        display: flex;
                        gap: 15px;
                        font-size: 12px;
                        font-weight: 600;
                        color: var(--text-muted);
                    }
                    .slider-meta-premium span { display: flex; align-items: center; gap: 4px; }

                    .slider-trash-btn-premium {
                        width: 42px;
                        height: 42px;
                        background: #fff5f5;
                        color: #e53e3e;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                    }
                    .slider-trash-btn-premium:hover {
                        background: #e53e3e;
                        color: white;
                        transform: rotate(-10deg) scale(1.1);
                    }

                    .preview-container { width: 100%; height: 100%; position: relative; }
                    .preview-container img { width: 100%; height: 100%; object-fit: cover; }
                    .remove-preview {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: rgba(255,255,255,0.9);
                        color: #e53e3e;
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: var(--shadow-sm);
                    }
                `}</style>
        </>
    );
}
