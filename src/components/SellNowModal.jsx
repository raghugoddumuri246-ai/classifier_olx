import { useState, useRef } from 'react';
import {
    X, Upload, Plus, Trash2, Tag, DollarSign, MapPin,
    FileText, Package, ChevronDown, Camera, CheckCircle
} from 'lucide-react';
import '../styles/SellNowModal.css';

const CATEGORIES = [
    '📱 Mobiles & Tablets', '💻 Electronics', '🚗 Cars & Vehicles',
    '🏍️ Bikes & Motorcycles', '🏠 Property', '🛋️ Furniture & Decor',
    '👗 Fashion', '📚 Books & Education', '💼 Jobs', '🐶 Pets',
    '⚽ Sports & Hobbies', '🔧 Tools & Machinery', '🌾 Agriculture', '✨ Others'
];

const CONDITIONS = ['Brand New', 'Like New', 'Good', 'Fair', 'For Parts'];

export default function SellNowModal({ onClose }) {
    const [step, setStep] = useState(0); // 0=category, 1=subcategory/details, 2=images, 3=done
    const [images, setImages] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const [form, setForm] = useState({
        title: '', category: '', price: '', condition: '',
        description: '', location: '', brand: '', year: '', negotiable: false,
        subCategory: '', type: '', bhk: '', bathrooms: '', furnishing: '', listedBy: ''
    });
    const fileInputRef = useRef();

    const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleImageDrop = (e) => {
        e.preventDefault(); setDragOver(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        addImages(files);
    };

    const handleImageSelect = (e) => {
        addImages(Array.from(e.target.files));
    };

    const addImages = (files) => {
        const newImgs = files.slice(0, 10 - images.length).map(file => ({
            id: Date.now() + Math.random(),
            url: URL.createObjectURL(file),
            name: file.name,
            file
        }));
        setImages(prev => [...prev, ...newImgs]);
    };

    const removeImage = (id) => setImages(prev => prev.filter(i => i.id !== id));

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(3);
    };

    const handleCategorySelect = (cat) => {
        update('category', cat);
        setStep(1);
    };

    return (
        <div className="sell-overlay" onClick={onClose}>
            <div className="sell-modal" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="sell-header">
                    <div className="sell-header-left">
                        <div className="sell-icon-wrap">
                            <Tag size={18} />
                        </div>
                        <div>
                            <h2 className="sell-title">Post Your Ad</h2>
                            <p className="sell-sub">Free listing — reaches millions of buyers</p>
                        </div>
                    </div>
                    <button className="sell-close" onClick={onClose}><X size={18} /></button>
                </div>

                {/* Step indicator */}
                {step > 0 && <div className="sell-steps">
                    {['Details', 'Photos', 'Done'].map((s, i) => (
                        <div key={s} className={`sell-step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                            <div className="step-circle">{step > i + 1 ? '✓' : i + 1}</div>
                            <span>{s}</span>
                        </div>
                    ))}
                </div>}

                {/* STEP 0 - Category Section */}
                {step === 0 && (
                    <div className="sell-body category-select-body">
                        <h3 className="cat-sel-title">CHOOSE A CATEGORY</h3>
                        <div className="category-list">
                            {CATEGORIES.map(c => (
                                <button key={c} className="cat-list-item" onClick={() => handleCategorySelect(c)}>
                                    <span>{c}</span>
                                    <ChevronDown size={16} className="rt-arrow" style={{ transform: 'rotate(-90deg)' }} />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {step === 1 && (
                    <form className="sell-body" onSubmit={e => { e.preventDefault(); setStep(2); }}>
                        <div className="sell-form-grid">

                            {/* Section Header */}
                            <div className="selected-category-strip">
                                <span className="sc-label">SELECTED CATEGORY</span>
                                <div className="sc-val">
                                    {form.category}
                                    <button type="button" onClick={() => setStep(0)} className="sc-change">Change</button>
                                </div>
                            </div>

                            <div className="sell-form-grid">
                                <h3 className="section-sub-title full">INCLUDE SOME DETAILS</h3>

                                {/* Conditional Property Fields */}
                                {(form.category === '🏠 Property') && (
                                    <>
                                        <div className="sell-field full">
                                            <label>Type *</label>
                                            <div className="condition-chips">
                                                {['Flats / Apartments', 'Independent / Builder Floors', 'Individual House / Villa'].map(t => (
                                                    <button type="button" key={t} className={`cond-chip ${form.type === t ? 'active' : ''}`} onClick={() => update('type', t)}>{t}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="sell-field">
                                            <label>BHK</label>
                                            <div className="condition-chips">
                                                {['1', '2', '3', '4', '4+'].map(b => (
                                                    <button type="button" key={b} className={`cond-chip ${form.bhk === b ? 'active' : ''}`} onClick={() => update('bhk', b)}>{b}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="sell-field">
                                            <label>Bathrooms</label>
                                            <div className="condition-chips">
                                                {['1', '2', '3', '4', '4+'].map(b => (
                                                    <button type="button" key={b} className={`cond-chip ${form.bathrooms === b ? 'active' : ''}`} onClick={() => update('bathrooms', b)}>{b}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="sell-field full">
                                            <label>Furnishing</label>
                                            <div className="condition-chips">
                                                {['Furnished', 'Semi-Furnished', 'Unfurnished'].map(f => (
                                                    <button type="button" key={f} className={`cond-chip ${form.furnishing === f ? 'active' : ''}`} onClick={() => update('furnishing', f)}>{f}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="sell-field full">
                                            <label>Listed by</label>
                                            <div className="condition-chips">
                                                {['Builder', 'Dealer', 'Owner'].map(l => (
                                                    <button type="button" key={l} className={`cond-chip ${form.listedBy === l ? 'active' : ''}`} onClick={() => update('listedBy', l)}>{l}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Conditional Car Fields */}
                                {(form.category === '🚗 Cars & Vehicles' || form.category === '🏍️ Bikes & Motorcycles') && (
                                    <>
                                        <div className="sell-field">
                                            <label><Tag size={14} /> Brand / Make</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Honda, Suzuki…"
                                                value={form.brand}
                                                onChange={e => update('brand', e.target.value)}
                                            />
                                        </div>
                                        <div className="sell-field">
                                            <label>📅 Year</label>
                                            <input
                                                type="number" min="1990" max="2025"
                                                placeholder="e.g. 2022"
                                                value={form.year}
                                                onChange={e => update('year', e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Condition - for items */}
                                {!['🏠 Property', '💼 Jobs', '⚽ Sports & Hobbies', '✨ Others'].includes(form.category) && (
                                    <div className="sell-field full">
                                        <label><CheckCircle size={14} /> Condition</label>
                                        <div className="condition-chips">
                                            {CONDITIONS.map(c => (
                                                <button
                                                    type="button" key={c}
                                                    className={`cond-chip ${form.condition === c ? 'active' : ''}`}
                                                    onClick={() => update('condition', c)}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Title */}
                                <div className="sell-field full">
                                    <label><FileText size={14} /> Ad Title *</label>
                                    <input
                                        type="text"
                                        placeholder="Be specific, e.g. iPhone 15 Pro Max 256GB"
                                        value={form.title}
                                        onChange={e => update('title', e.target.value)}
                                        required
                                        maxLength={80}
                                    />
                                    <span className="char-count">{form.title.length}/80</span>
                                </div>

                                {/* Description */}
                                <div className="sell-field full">
                                    <label><FileText size={14} /> Description *</label>
                                    <textarea
                                        placeholder="Describe your item — include features, reason for selling, accessories included…"
                                        value={form.description}
                                        onChange={e => update('description', e.target.value)}
                                        required
                                        rows={4}
                                        maxLength={2000}
                                    />
                                    <span className="char-count">{form.description.length}/2000</span>
                                </div>

                                {/* Price */}
                                <div className="sell-field full">
                                    <label className="section-sub-title form-sp">SET A PRICE</label>
                                    <div className="price-wrap">
                                        <span className="price-sym">₹</span>
                                        <input
                                            type="number" min="0"
                                            placeholder="0"
                                            value={form.price}
                                            onChange={e => update('price', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <label className="toggle-label mt-2">
                                        <input type="checkbox" checked={form.negotiable} onChange={e => update('negotiable', e.target.checked)} />
                                        <span>Price is negotiable</span>
                                    </label>
                                </div>

                                {/* Location */}
                                <div className="sell-field full">
                                    <label className="section-sub-title form-sp">CONFIRM YOUR LOCATION</label>
                                    <div className="location-box">
                                        <MapPin size={16} />
                                        <select
                                            className="location-select"
                                            value={form.location}
                                            onChange={e => update('location', e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select your city or area</option>
                                            <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                                            <option value="Delhi, NCR">Delhi, NCR</option>
                                            <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
                                            <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                                            <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                                            <option value="Kolkata, West Bengal">Kolkata, West Bengal</option>
                                            <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                                            <option value="Ahmedabad, Gujarat">Ahmedabad, Gujarat</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sell-footer-actions">
                            <button type="button" className="sell-cancel-btn" onClick={() => setStep(0)}>← Back</button>
                            <button type="submit" className="sell-next-btn">Next: Add Photos →</button>
                        </div>
                    </form>
                )}

                {/* STEP 2 — Images */}
                {step === 2 && (
                    <div className="sell-body">
                        <div className="img-section-header">
                            <h3>Add Photos <span className="img-count">{images.length}/10</span></h3>
                            <p>Ads with photos get 3× more responses. First photo is the cover.</p>
                        </div>

                        {/* Drop zone */}
                        <div
                            className={`img-dropzone ${dragOver ? 'drag-over' : ''}`}
                            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleImageDrop}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <Camera size={36} />
                            <p><strong>Drag & drop photos</strong> or <span className="browse-link">browse</span></p>
                            <span>JPG, PNG, WEBP — max 10MB each</span>
                            <input
                                ref={fileInputRef}
                                type="file" multiple accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageSelect}
                            />
                        </div>

                        {/* Thumbnails */}
                        {images.length > 0 && (
                            <div className="img-grid">
                                {images.map((img, i) => (
                                    <div key={img.id} className={`img-thumb ${i === 0 ? 'cover' : ''}`}>
                                        <img src={img.url} alt={img.name} />
                                        {i === 0 && <span className="cover-badge">Cover</span>}
                                        <button className="img-remove" onClick={() => removeImage(img.id)}><Trash2 size={13} /></button>
                                    </div>
                                ))}
                                {images.length < 10 && (
                                    <button className="img-add-more" onClick={() => fileInputRef.current.click()}>
                                        <Plus size={22} />
                                        <span>Add more</span>
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="sell-footer-actions">
                            <button className="sell-cancel-btn" onClick={() => setStep(1)}>← Back</button>
                            <button className="sell-next-btn" onClick={handleSubmit}>Post Ad Free →</button>
                        </div>
                    </div>
                )}

                {/* STEP 3 — Success */}
                {step === 3 && (
                    <div className="sell-success">
                        <div className="sell-success-icon">🎉</div>
                        <h2>Ad Posted Successfully!</h2>
                        <p>Your listing is now live and visible to millions of buyers across India.</p>
                        <div className="sell-success-details">
                            <div><span>Title</span><strong>{form.title}</strong></div>
                            <div><span>Price</span><strong>₹{Number(form.price).toLocaleString('en-IN')}</strong></div>
                            <div><span>Location</span><strong>{form.location}</strong></div>
                        </div>
                        <div className="sell-success-actions">
                            <button className="sell-cancel-btn" onClick={onClose}>Browse Listings</button>
                            <button className="sell-next-btn" onClick={() => { setStep(1); setImages([]); setForm({ title: '', category: '', price: '', condition: '', description: '', location: '', brand: '', year: '', negotiable: false }); }}>
                                Post Another Ad
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
