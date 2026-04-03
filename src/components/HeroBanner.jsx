import { useState } from 'react';
import { Filter, Zap, ShieldCheck, Tag, Star } from 'lucide-react';
import heroBgLight from '../assets/hero_3d_isolated_light.png';
import heroBgDark from '../assets/hero_3d_isolated_dark.png';
import '../styles/HeroBanner.css';

export default function HeroBanner({ onSearch, selectedLocation, onOpenFilters }) {
    return (
        <section className="hero">
            <div className="hero-glow-blob top-left"></div>
            <div className="hero-glow-blob bottom-right"></div>
            
            <div className="container hero-content">
                <div className="hero-text-content">
                    {/* Eyebrow */}
                    <div className="hero-eyebrow">
                        <Zap size={13} fill="currentColor" />
                        India's #1 Marketplace — Trusted by 150M+ Users
                    </div>

                    {/* Headline */}
                    <h1 className="hero-heading">
                        Unlock The Best Deals <em>Around You</em>
                    </h1>

                    {/* Description */}
                    <p className="hero-desc">
                        Your premium destination for buying and selling cars, electronics, properties, and more. 
                        Experience seamless trading every single day.
                    </p>

                    {/* Filters CTA */}
                    <div className="hero-actions">
                        <button className="hero-filter-btn" onClick={onOpenFilters}>
                            <Filter size={18} />
                            Filters
                        </button>
                        <button className="hero-outline-btn">
                            Explore Categories
                        </button>
                    </div>
                    
                    <div className="hero-stats">
                        <div className="stat-item">
                            <h4>150M+</h4>
                            <p>Active Users</p>
                        </div>
                        <div className="stat-item">
                            <h4>50M+</h4>
                            <p>Live Ads</p>
                        </div>
                        <div className="stat-item">
                            <h4>#1</h4>
                            <p>Marketplace</p>
                        </div>
                    </div>
                </div>

                <div className="hero-image-content">
                    <div className="hero-image-wrapper">
                        <img src={heroBgLight} alt="3D Marketplace Light" className="hero-3d-img light-img" />
                        <img src={heroBgDark} alt="3D Marketplace Dark" className="hero-3d-img dark-img" />
                        
                        {/* Floating elements */}
                        <div className="floating-pill pill-1">
                            <div className="pill-icon"><ShieldCheck size={14} /></div>
                            <span>Verified Sellers</span>
                        </div>
                        
                        <div className="floating-pill pill-2">
                            <div className="pill-icon"><Tag size={14} /></div>
                            <span>Best Prices</span>
                        </div>
                        
                        <div className="floating-pill pill-3">
                            <div className="pill-icon"><Star size={14} /></div>
                            <span>Premium Quality</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
