import { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import '../styles/AdminPages.css';

export default function LocationsManagement() {
    const [locations, setLocations] = useState([]);
    const [newName, setNewName] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchLocations = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:5000/api/locations');
            setLocations(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            await axios.post('http://localhost:5000/api/admin/locations', { name: newName }, config);
            setNewName('');
            fetchLocations();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="admin-loading">Loading Locations...</div>;

    return (
        <>
            <div className="admin-page-content animate-in">
                <header className="admin-content-header">
                    <div>
                        <h1 className="admin-page-title">Locations Management</h1>
                        <p className="admin-page-sub">Add or edit available listing locations</p>
                    </div>
                </header>

                    <div className="mgmt-card large">
                        <div className="mgmt-card-header">
                            <h3>Active Market Locations</h3>
                            <span className="count-badge">{locations.length} total</span>
                        </div>

                        <div className="locations-grid-premium">
                            {locations.map(l => (
                                <div key={l._id} className="location-badge-item">
                                    <div className="loc-main">
                                        <MapPin size={16} />
                                        <span>{l.name}</span>
                                    </div>
                                    <button 
                                        className="loc-delete" 
                                        title="Remove Location"
                                        onClick={() => {
                                            if(window.confirm(`Remove ${l.name}?`)) {
                                                // Handle delete logic here
                                            }
                                        }}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}

                            <div className="location-add-inline">
                                <form onSubmit={handleAdd}>
                                    <input 
                                        type="text" 
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        placeholder="Add new city..."
                                        required
                                    />
                                    <button type="submit"><Plus size={16} /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .mgmt-card.large { grid-column: 1 / -1; }
                    .mgmt-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 24px;
                    }
                    .count-badge {
                        background: rgba(49, 130, 206, 0.1);
                        color: var(--primary);
                        padding: 4px 12px;
                        border-radius: 50px;
                        font-size: 12px;
                        font-weight: 700;
                    }
                    .locations-grid-premium {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 16px;
                    }
                    .location-badge-item {
                        background: var(--bg-main);
                        border: 1px solid var(--border);
                        padding: 12px 16px;
                        border-radius: var(--radius-md);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        transition: var(--transition);
                    }
                    .location-badge-item:hover {
                        border-color: var(--primary);
                        background: white;
                        box-shadow: var(--shadow-sm);
                        transform: translateY(-2px);
                    }
                    .loc-main {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-weight: 600;
                        color: var(--text-primary);
                    }
                    .loc-main svg { color: var(--text-muted); }
                    .location-badge-item:hover .loc-main svg { color: var(--primary); }
                    
                    .loc-delete {
                        color: var(--text-muted);
                        opacity: 0;
                        transition: var(--transition);
                    }
                    .location-badge-item:hover .loc-delete {
                        opacity: 1;
                        color: #E53E3E;
                    }
                    
                    .location-add-inline {
                        background: white;
                        border: 2px dashed var(--border);
                        border-radius: var(--radius-md);
                        padding: 4px;
                    }
                    .location-add-inline form {
                        display: flex;
                        height: 100%;
                    }
                    .location-add-inline input {
                        flex: 1;
                        border: none;
                        background: transparent;
                        padding: 8px 12px;
                        font-size: 14px;
                        font-weight: 500;
                    }
                    .location-add-inline input:focus { outline: none; }
                    .location-add-inline button {
                        background: var(--primary);
                        color: white;
                        width: 34px;
                        height: 34px;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                `}</style>
        </>
    );
}
