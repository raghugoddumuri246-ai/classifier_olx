import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/AdvertisementSection.css';

const adCampaigns = [
    {
        id: 1,
        title: "2024 Tesla Model 3 Long Range",
        price: '₹ 45,00,000',
        tag: "Sponsored • Cars",
        images: [
            "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 2,
        title: "Apple iPhone 15 Pro Max - 256GB",
        price: '₹ 1,35,000',
        tag: "Promoted • Mobiles",
        images: [
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1700684144365-5d933ca3dff3?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 3,
        title: "Modern 4BHK Villa with Pool",
        price: '₹ 3.5 Cr',
        tag: "Featured • Real Estate",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 4,
        title: "Vintage Leather Sofa Set",
        price: '₹ 45,000',
        tag: "Hot Deal • Furniture",
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 5,
        title: "Sony Alpha A7 IV Mirrorless",
        price: '₹ 2,10,000',
        tag: "Trending • Cameras",
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519923834699-e68ebed6a489?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 6,
        title: "Rolex Submariner Date 2021",
        price: '₹ 11,50,000',
        tag: "Luxury • Watches",
        images: [
            "https://images.unsplash.com/photo-1548171915-e7af561c2ba2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587836141334-5853f6560965?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 7,
        title: "Alienware Aurora R15 PC",
        price: '₹ 3,45,000',
        tag: "Gaming • Computers",
        images: [
            "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop"
        ]
    }
];

// Only display exactly 3 cards
const topAds = adCampaigns.slice(0, 3);

function AdCard({ ad }) {
    const [imgIdx, setImgIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-scroll images every 2.5 seconds if NOT hovered
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setImgIdx(p => (p + 1) % ad.images.length);
        }, 2500);
        return () => clearInterval(timer);
    }, [isHovered, ad.images.length]);

    const nextImg = (e) => {
        e.preventDefault();
        setImgIdx(p => (p + 1) % ad.images.length);
    };

    const prevImg = (e) => {
        e.preventDefault();
        setImgIdx(p => (p - 1 + ad.images.length) % ad.images.length);
    };

    return (
        <div 
            className="ad-card-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="ad-card-image-slider">
                <img src={ad.images[imgIdx]} alt={ad.title} className="ad-img-active" />
                
                <button className="ad-img-nav prev" onClick={prevImg} aria-label="Previous Image"><ChevronLeft size={16}/></button>
                <button className="ad-img-nav next" onClick={nextImg} aria-label="Next Image"><ChevronRight size={16}/></button>
                
                <div className="ad-img-dots">
                    {ad.images.map((_, i) => (
                        <div key={i} className={`ad-dot ${i === imgIdx ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setImgIdx(i); }} />
                    ))}
                </div>
            </div>
            <div className="ad-card-body">
                <span className="ad-tag">{ad.tag}</span>
                <span className="ad-price">{ad.price}</span>
                <h4>{ad.title}</h4>
                <button className="ad-card-btn">View Listing</button>
            </div>
        </div>
    );
}

export default function AdvertisementSection() {
    return (
        <section className="ads-section">
            <div className="container">
                <div className="ads-header">
                    <h2>Featured Promoted Listings</h2>
                </div>
                
                <div className="ads-grid-container">
                    {topAds.map((ad) => (
                        <AdCard key={ad.id} ad={ad} />
                    ))}
                </div>
            </div>
        </section>
    );
}
