import { useState, useMemo } from 'react';
import { LayoutGrid, List, SortDesc, ChevronDown, X } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import { listings, categories, sortOptions } from '../data/listings';
import '../styles/ListingsPage.css';

export default function ListingsPage({ searchQuery, selectedLocation, onSearchChange }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [sortOpen, setSortOpen] = useState(false);

    const handleClearFilters = () => {
        setSelectedCategory('all');
        if (onSearchChange) onSearchChange('');
    };

    const filtered = useMemo(() => {
        let result = [...listings];

        // Search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (l) =>
                    l.title.toLowerCase().includes(q) ||
                    l.description.toLowerCase().includes(q) ||
                    l.category.toLowerCase().includes(q)
            );
        }

        // Location filter
        if (selectedLocation && selectedLocation !== 'All India') {
            result = result.filter((l) => l.location === selectedLocation);
        }

        // Category
        if (selectedCategory !== 'all') {
            result = result.filter((l) => l.category === selectedCategory);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.postedAt) - new Date(a.postedAt);
            if (sortBy === 'oldest') return new Date(a.postedAt) - new Date(b.postedAt);
            if (sortBy === 'price_low') return a.price - b.price;
            if (sortBy === 'price_high') return b.price - a.price;
            return 0;
        });

        return result;
    }, [searchQuery, selectedLocation, selectedCategory, sortBy]);

    const currentSortLabel = sortOptions.find((s) => s.value === sortBy)?.label;

    return (
        <div className="listings-page">
            {/* Hero */}
            <HeroBanner onSearch={(q) => { onSearchChange(q); }} selectedLocation={selectedLocation} />

            {/* Category Grid */}
            <CategoryGrid onCategorySelect={(cat) => { setSelectedCategory(cat); window.scrollTo({ top: 600, behavior: 'smooth' }); }} />

            <div id="listings-section" className="container listings-layout">
                <div className="listings-main">
                    {/* Right Side */}
                    <div className="listings-right" style={{ width: '100%', flex: '1' }}>
                        {/* Toolbar */}
                        <div className="listings-toolbar">
                            <div className="toolbar-left">
                                <h2 className="section-title">
                                    {selectedCategory === 'all'
                                        ? 'All Listings'
                                        : categories.find((c) => c.id === selectedCategory)?.label}
                                </h2>
                                {searchQuery && (
                                    <span className="search-tag">
                                        "{searchQuery}"
                                    </span>
                                )}
                            </div>

                            <div className="toolbar-right">
                                {/* Sort */}
                                <div className="sort-wrapper" onClick={() => setSortOpen(!sortOpen)}>
                                    <SortDesc size={15} />
                                    <span>{currentSortLabel}</span>
                                    <ChevronDown size={14} className={sortOpen ? 'open' : ''} />
                                    {sortOpen && (
                                        <div className="sort-dropdown">
                                            {sortOptions.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    className={`sort-item ${sortBy === opt.value ? 'active' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); setSortBy(opt.value); setSortOpen(false); }}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* View Mode */}
                                <div className="view-toggle">
                                    <button
                                        className={viewMode === 'grid' ? 'active' : ''}
                                        onClick={() => setViewMode('grid')}
                                        title="Grid View"
                                    >
                                        <LayoutGrid size={16} />
                                    </button>
                                    <button
                                        className={viewMode === 'list' ? 'active' : ''}
                                        onClick={() => setViewMode('list')}
                                        title="List View"
                                    >
                                        <List size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters Strip */}
                        {(searchQuery || selectedCategory !== 'all') && (
                            <div className="active-filters">
                                <span className="af-label">Active:</span>
                                {searchQuery && (
                                    <span className="af-tag">
                                        "{searchQuery}"
                                        <button onClick={() => onSearchChange('')}><X size={11} /></button>
                                    </span>
                                )}
                                {selectedCategory !== 'all' && (
                                    <span className="af-tag">
                                        {categories.find((c) => c.id === selectedCategory)?.label}
                                        <button onClick={() => setSelectedCategory('all')}><X size={11} /></button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Grid / List */}
                        {filtered.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">🔍</div>
                                <h3>No listings found</h3>
                                <p>Try adjusting your filters or search query</p>
                                <button className="reset-btn" onClick={handleClearFilters}>Clear All Filters</button>
                            </div>
                        ) : (
                            <div className={`listings-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                                {filtered.map((listing, i) => (
                                    <div key={listing.id} style={{ animationDelay: `${i * 0.04}s` }}>
                                        <ListingCard listing={listing} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
