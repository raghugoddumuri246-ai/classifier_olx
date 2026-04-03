import { useState, useMemo } from 'react';
import { LayoutGrid, List, SortDesc, ChevronDown, X } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import FilterSidebar from '../components/FilterSidebar';
import AdvertisementSection from '../components/AdvertisementSection';
import { listings, categories, sortOptions } from '../data/listings';
import '../styles/ListingsPage.css';

export default function ListingsPage({ searchQuery, selectedLocation, onSearchChange, filtersOpen, onCloseFilters, onOpenFilters }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [appliedFilters, setAppliedFilters] = useState({});
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [sortOpen, setSortOpen] = useState(false);

    const handleClearFilters = () => {
        setSelectedCategory('all');
        setAppliedFilters({});
        if (onSearchChange) onSearchChange('');
    };

    const handleApplyFilters = (cat, filters) => {
        setSelectedCategory(cat);
        setAppliedFilters(filters);
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

        // Apply extra filters from appliedFilters
        if (appliedFilters.priceRange) {
            result = result.filter(l => l.price >= appliedFilters.priceRange.min && l.price <= appliedFilters.priceRange.max);
        } else if (appliedFilters.customMin || appliedFilters.customMax) {
            const min = appliedFilters.customMin ? parseInt(appliedFilters.customMin) : 0;
            const max = appliedFilters.customMax ? parseInt(appliedFilters.customMax) : Infinity;
            result = result.filter(l => l.price >= min && l.price <= max);
        }

        if (appliedFilters.condition) {
            result = result.filter(l => l.condition === appliedFilters.condition);
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
    }, [searchQuery, selectedLocation, selectedCategory, sortBy, appliedFilters]);

    const currentSortLabel = sortOptions.find((s) => s.value === sortBy)?.label;

    return (
        <div className="listings-page">
            <FilterSidebar 
                isOpen={filtersOpen}
                onClose={onCloseFilters}
                onApply={handleApplyFilters}
                categories={categories}
                initialCategory={selectedCategory}
                initialFilters={appliedFilters}
                totalResults={filtered.length}
            />

            {/* Hero */}
            <HeroBanner onSearch={(q) => { onSearchChange(q); }} selectedLocation={selectedLocation} onOpenFilters={onOpenFilters} />

            {/* Advertisement Section */}
            <AdvertisementSection />

            {/* Category Grid */}
            <CategoryGrid onCategorySelect={(cat) => { setSelectedCategory(cat); window.scrollTo({ top: 900, behavior: 'smooth' }); }} />

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
