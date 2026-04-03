import { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, X, Check } from 'lucide-react';
import '../styles/FilterSidebar.css';

const conditions = ['Brand New', 'Like New', 'Used', 'New'];

const priceRanges = [
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 – ₹25,000', min: 5000, max: 25000 },
    { label: '₹25,000 – ₹1 Lakh', min: 25000, max: 100000 },
    { label: '₹1 – ₹5 Lakh', min: 100000, max: 500000 },
    { label: '₹5 – ₹50 Lakh', min: 500000, max: 5000000 },
    { label: 'Above ₹50 Lakh', min: 5000000, max: Infinity },
];

function FilterSection({ title, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="filter-section">
            <button className="filter-section-header" onClick={() => setOpen(!open)}>
                <span>{title}</span>
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {open && <div className="filter-section-body">{children}</div>}
        </div>
    );
}

export default function FilterSidebar({
    categories,
    initialCategory,
    initialFilters,
    isOpen,
    onClose,
    onApply,
    totalResults,
}) {
    // Local state for filters so they don't apply immediately
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
    const [filters, setFilters] = useState(initialFilters || {});

    // Sync local state when opened
    useEffect(() => {
        if (isOpen) {
            setSelectedCategory(initialCategory);
            setFilters(initialFilters);
        }
    }, [isOpen, initialCategory, initialFilters]);

    if (!isOpen) return null;

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleClearLocal = () => {
        setSelectedCategory('all');
        setFilters({});
    };

    const handleApply = () => {
        onApply(selectedCategory, filters);
        onClose();
    };

    const activeFilterCount = [
        filters.priceRange,
        filters.condition,
        filters.postedWithin,
        filters.onlyFeatured,
    ].filter(Boolean).length + (selectedCategory !== 'all' ? 1 : 0);

    return (
        <div className="filter-modal-overlay" onClick={onClose}>
            <aside className="filter-sidebar modal-content" onClick={e => e.stopPropagation()}>
                {/* Sidebar Header */}
                <div className="sidebar-header">
                    <div className="sidebar-title">
                        <SlidersHorizontal size={18} />
                        <span>Filters</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="filter-scrollable-content">
                    {/* Category Filter */}
                    <FilterSection title="Category">
                        <div className="filter-options">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`filter-option category-option ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    <span className="cat-emoji">{cat.icon}</span>
                                    <span>{cat.label}</span>
                                    {selectedCategory === cat.id && <Check size={14} className="check-icon" />}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Price Range */}
                    <FilterSection title="Price Range">
                        <div className="filter-options">
                            {priceRanges.map((range) => {
                                const isActive = filters.priceRange?.label === range.label;
                                return (
                                    <button
                                        key={range.label}
                                        className={`filter-option ${isActive ? 'active' : ''}`}
                                        onClick={() =>
                                            handleFilterChange('priceRange', isActive ? null : range)
                                        }
                                    >
                                        <span>{range.label}</span>
                                        {isActive && <Check size={14} className="check-icon" />}
                                    </button>
                                );
                            })}
                        </div>
                        {/* Custom Range */}
                        <div className="custom-price">
                            <input
                                type="number"
                                placeholder="Min ₹"
                                value={filters.customMin || ''}
                                onChange={(e) => handleFilterChange('customMin', e.target.value)}
                            />
                            <span>–</span>
                            <input
                                type="number"
                                placeholder="Max ₹"
                                value={filters.customMax || ''}
                                onChange={(e) => handleFilterChange('customMax', e.target.value)}
                            />
                        </div>
                    </FilterSection>

                    {/* Condition */}
                    <FilterSection title="Condition">
                        <div className="filter-options">
                            {conditions.map((cond) => {
                                const isActive = filters.condition === cond;
                                return (
                                    <button
                                        key={cond}
                                        className={`filter-option ${isActive ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('condition', isActive ? null : cond)}
                                    >
                                        <span>{cond}</span>
                                        {isActive && <Check size={14} className="check-icon" />}
                                    </button>
                                );
                            })}
                        </div>
                    </FilterSection>
                </div>

                <div className="filter-actions-footer">
                    <button className="reset-btn" onClick={handleClearLocal}>
                        Reset
                    </button>
                    <button className="apply-btn" onClick={handleApply}>
                        Apply
                    </button>
                </div>
            </aside>
        </div>
    );
}
