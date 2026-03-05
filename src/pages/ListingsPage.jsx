import { useState, useMemo } from 'react';
import { LayoutGrid, List, SortDesc, ChevronDown, Filter, X } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import ListingCard from '../components/ListingCard';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import { listings, categories, sortOptions } from '../data/listings';
import '../styles/ListingsPage.css';

const defaultFilters = {
    priceRange: null,
    customMin: '',
    customMax: '',
    condition: null,
    postedWithin: null,
    onlyFeatured: false,
};

function getDateThreshold(postedWithin) {
    const now = new Date('2024-03-02');
    if (postedWithin === 'Today') return new Date(now - 1 * 86400000);
    if (postedWithin === 'Last 3 Days') return new Date(now - 3 * 86400000);
    if (postedWithin === 'This Week') return new Date(now - 7 * 86400000);
    if (postedWithin === 'This Month') return new Date(now - 30 * 86400000);
    return null;
}

export default function ListingsPage({ searchQuery, selectedLocation, onSearchChange }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filters, setFilters] = useState(defaultFilters);
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [sortOpen, setSortOpen] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => {
        setFilters(defaultFilters);
        setSelectedCategory('all');
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

        // Price range (predefined)
        if (filters.priceRange) {
            result = result.filter(
                (l) => l.price >= filters.priceRange.min && l.price <= filters.priceRange.max
            );
        }

        // Custom price range
        if (filters.customMin) {
            result = result.filter((l) => l.price >= Number(filters.customMin));
        }
        if (filters.customMax) {
            result = result.filter((l) => l.price <= Number(filters.customMax));
        }

        // Condition
        if (filters.condition) {
            result = result.filter((l) => l.condition === filters.condition);
        }

        // Posted within
        if (filters.postedWithin) {
            const threshold = getDateThreshold(filters.postedWithin);
            if (threshold) {
                result = result.filter((l) => new Date(l.postedAt) >= threshold);
            }
        }

        // Featured only
        if (filters.onlyFeatured) {
            result = result.filter((l) => l.isFeatured);
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
    }, [searchQuery, selectedLocation, selectedCategory, filters, sortBy]);

    const currentSortLabel = sortOptions.find((s) => s.value === sortBy)?.label;

    return (
        <div className="listings-page">
            {/* Hero */}
            <HeroBanner onSearch={(q) => { onSearchChange(q); }} selectedLocation={selectedLocation} />

            {/* Category Grid */}
            <CategoryGrid onCategorySelect={(cat) => { setSelectedCategory(cat); window.scrollTo({ top: 600, behavior: 'smooth' }); }} />

            <div id="listings-section" className="container listings-layout">
                {/* Mobile Filter Toggle */}
                <div className="mobile-filter-row">
                    <button
                        className="mobile-filter-toggle"
                        onClick={() => setMobileSidebarOpen(true)}
                    >
                        <Filter size={16} /> Filters
                    </button>
                    <div className="mobile-results-count">{filtered.length} results</div>
                </div>

                {/* Mobile Sidebar Overlay */}
                {mobileSidebarOpen && (
                    <div className="mobile-sidebar-overlay" onClick={() => setMobileSidebarOpen(false)}>
                        <div className="mobile-sidebar-panel" onClick={(e) => e.stopPropagation()}>
                            <button className="close-sidebar" onClick={() => setMobileSidebarOpen(false)}>
                                <X size={20} /> Close
                            </button>
                            <FilterSidebar
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={(c) => { setSelectedCategory(c); setMobileSidebarOpen(false); }}
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                                totalResults={filtered.length}
                            />
                        </div>
                    </div>
                )}

                <div className="listings-main">
                    {/* Desktop Filter Sidebar */}
                    <div className="desktop-sidebar">
                        <FilterSidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                            totalResults={filtered.length}
                        />
                    </div>

                    {/* Right Side */}
                    <div className="listings-right">
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
                        {(searchQuery || filters.priceRange || filters.condition || filters.postedWithin || filters.onlyFeatured || selectedCategory !== 'all') && (
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
                                {filters.priceRange && (
                                    <span className="af-tag">
                                        {filters.priceRange.label}
                                        <button onClick={() => handleFilterChange('priceRange', null)}><X size={11} /></button>
                                    </span>
                                )}
                                {filters.condition && (
                                    <span className="af-tag">
                                        {filters.condition}
                                        <button onClick={() => handleFilterChange('condition', null)}><X size={11} /></button>
                                    </span>
                                )}
                                {filters.postedWithin && (
                                    <span className="af-tag">
                                        {filters.postedWithin}
                                        <button onClick={() => handleFilterChange('postedWithin', null)}><X size={11} /></button>
                                    </span>
                                )}
                                {filters.onlyFeatured && (
                                    <span className="af-tag">
                                        Featured
                                        <button onClick={() => handleFilterChange('onlyFeatured', false)}><X size={11} /></button>
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
