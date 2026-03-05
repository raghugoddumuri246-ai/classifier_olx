import { useState } from 'react';
import { Search, ArrowRight, TrendingUp, ShieldCheck, Star, Zap, MapPin } from 'lucide-react';
import '../styles/HeroBanner.css';

const trendingSearches = ['iPhone 15', 'Royal Enfield', '2BHK Flat', 'MacBook Pro', 'PS5'];

export default function HeroBanner({ onSearch, selectedLocation }) {
    const handleTrending = (t) => {
        onSearch(t);
        setTimeout(() => {
            const el = document.getElementById('listings-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
    };

    return (
        <section className="hero">
            {/* Decorative background */}
            <div className="hero-bg">
                <div className="hero-blob b1" />
                <div className="hero-blob b2" />
                <div className="hero-grid-lines" />
            </div>

            <div className="container hero-content">
                {/* Eyebrow */}
                <div className="hero-eyebrow">
                    <Zap size={13} fill="currentColor" />
                    India's #1 Marketplace — Trusted by 150M+ Users
                </div>

                {/* Headline */}
                <h1 className="hero-heading">
                    Buy &amp; Sell <em>Anything</em>
                    <br />
                    <span className="heading-sub">Near You, Right Now.</span>
                </h1>

                {/* Description */}
                <p className="hero-desc">
                    From cars to gadgets, property to pets — discover incredible deals
                    or post your item for free in under 60 seconds.
                </p>

                {/* Trending */}
                <div className="hero-trending">
                    <span className="trend-label">
                        <TrendingUp size={13} /> Trending:
                    </span>
                    {trendingSearches.map((t) => (
                        <button key={t} className="trend-pill" onClick={() => handleTrending(t)}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
