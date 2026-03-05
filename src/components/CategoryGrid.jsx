import '../styles/CategoryGrid.css';

const categoryData = [
    { id: 'cars', label: 'Cars', emoji: '🚗', count: '1.2L+', gradient: 'linear-gradient(135deg,#FF6B6B,#FF8E53)' },
    { id: 'property', label: 'Properties', emoji: '🏠', count: '85K+', gradient: 'linear-gradient(135deg,#4776E6,#8E54E9)' },
    { id: 'mobiles', label: 'Mobiles', emoji: '📱', count: '2.4L+', gradient: 'linear-gradient(135deg,#11998E,#38EF7D)' },
    { id: 'electronics', label: 'Electronics', emoji: '💻', count: '98K+', gradient: 'linear-gradient(135deg,#FC5C7D,#6A82FB)' },
    { id: 'bikes', label: 'Bikes', emoji: '🏍️', count: '67K+', gradient: 'linear-gradient(135deg,#F7971E,#FFD200)' },
    { id: 'furniture', label: 'Furniture', emoji: '🛋️', count: '45K+', gradient: 'linear-gradient(135deg,#43CBFF,#9708CC)' },
    { id: 'fashion', label: 'Fashion', emoji: '👗', count: '1.8L+', gradient: 'linear-gradient(135deg,#F953C6,#B91D73)' },
    { id: 'jobs', label: 'Jobs', emoji: '💼', count: '32K+', gradient: 'linear-gradient(135deg,#56CCF2,#2F80ED)' },
    { id: 'pets', label: 'Pets', emoji: '🐶', count: '18K+', gradient: 'linear-gradient(135deg,#56AB2F,#A8E063)' },
    { id: 'all', label: 'More', emoji: '✨', count: '', gradient: 'linear-gradient(135deg,#373B44,#4286f4)' },
];

export default function CategoryGrid({ onCategorySelect }) {
    return (
        <section className="cat-section">
            <div className="container">
                <div className="cat-header">
                    <h2 className="cat-title">Browse Categories</h2>
                    <p className="cat-subtitle">Find exactly what you're looking for</p>
                </div>
                <div className="cat-grid">
                    {categoryData.map((cat) => (
                        <button
                            key={cat.id}
                            className="cat-card"
                            onClick={() => onCategorySelect(cat.id)}
                        >
                            <div className="cat-icon-wrap" style={{ background: cat.gradient }}>
                                <span className="cat-emoji">{cat.emoji}</span>
                            </div>
                            <span className="cat-name">{cat.label}</span>
                            {cat.count && (
                                <span className="cat-count">{cat.count} ads</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
