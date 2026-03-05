import { useState } from 'react';
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
    selectedCategory,
    onCategoryChange,
    filters,
    onFilterChange,
    onClearFilters,
    totalResults,
}) {
    const activeFilterCount = [
        filters.priceRange,
        filters.condition,
        filters.postedWithin,
        filters.onlyFeatured,
    ].filter(Boolean).length;

    return (
        <aside className="filter-sidebar">
            {/* Sidebar Header */}
            <div className="sidebar-header">
                <div className="sidebar-title">
                    <SlidersHorizontal size={18} />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                        <span className="filter-badge">{activeFilterCount}</span>
                    )}
                </div>
                {activeFilterCount > 0 && (
                    <button className="clear-btn" onClick={onClearFilters}>
                        <X size={14} />
                        Clear all
                    </button>
                )}
            </div>

            {/* Results count */}
            <div className="results-count">
                <span className="count-num">{totalResults}</span> results found
            </div>

            {/* Category Filter */}
            <FilterSection title="Category">
                <div className="filter-options">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`filter-option category-option ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => onCategoryChange(cat.id)}
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
                                    onFilterChange('priceRange', isActive ? null : range)
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
                        onChange={(e) => onFilterChange('customMin', e.target.value)}
                    />
                    <span>–</span>
                    <input
                        type="number"
                        placeholder="Max ₹"
                        value={filters.customMax || ''}
                        onChange={(e) => onFilterChange('customMax', e.target.value)}
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
                                onClick={() => onFilterChange('condition', isActive ? null : cond)}
                            >
                                <span>{cond}</span>
                                {isActive && <Check size={14} className="check-icon" />}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Posted Within */}
            <FilterSection title="Posted Within">
                <div className="filter-options">
                    {['Today', 'Last 3 Days', 'This Week', 'This Month'].map((period) => {
                        const isActive = filters.postedWithin === period;
                        return (
                            <button
                                key={period}
                                className={`filter-option ${isActive ? 'active' : ''}`}
                                onClick={() => onFilterChange('postedWithin', isActive ? null : period)}
                            >
                                <span>{period}</span>
                                {isActive && <Check size={14} className="check-icon" />}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Featured Toggle */}
            <FilterSection title="Listing Type" defaultOpen={false}>
                <label className="toggle-option">
                    <div className="toggle-info">
                        <span className="toggle-label">Featured Only</span>
                        <span className="toggle-desc">Show premium listings</span>
                    </div>
                    <div
                        className={`toggle-switch ${filters.onlyFeatured ? 'on' : ''}`}
                        onClick={() => onFilterChange('onlyFeatured', !filters.onlyFeatured)}
                    >
                        <div className="toggle-thumb" />
                    </div>
                </label>
            </FilterSection>
        </aside>
    );
}
