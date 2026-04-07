import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bgCars from '../assets/hero_bg_cars.png';
import bgTech from '../assets/hero_bg_tech.png';
import bgHome from '../assets/hero_bg_home.png';
import '../styles/HeroBanner.css';

const slides = [
    {
        id: 1,
        image: bgTech,
        title: "Discover Premium Deals",
        subtitle: "India's #1 Marketplace for authentic and verified electronics.",
        btnPrimary: "Explore Electronics",
        btnSecondary: "Start Selling"
    },
    {
        id: 2,
        image: bgCars,
        title: "Your Dream Ride Awaits",
        subtitle: "Thousands of verified cars at unbeatable prices.",
        btnPrimary: "Browse Cars",
        btnSecondary: "Post an Ad"
    },
    {
        id: 3,
        image: bgHome,
        title: "Find Your Perfect Home",
        subtitle: "Discover properties that match your lifestyle and budget.",
        btnPrimary: "Search Properties",
        btnSecondary: "List Your Home"
    }
];

export default function HeroBanner({ onOpenFilters }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <section className="hero-slider-section">
            <div className="hero-slider-container">
                {slides.map((slide, index) => {
                    let position = "next";
                    if (index === currentIndex) position = "active";
                    else if (index === (currentIndex - 1 + slides.length) % slides.length) position = "prev";

                    return (
                        <div className={`hero-slide ${position}`} key={slide.id}>
                            <img src={slide.image} alt="Background" className="hero-slide-bg" />
                        </div>
                    );
                })}

                <button className="slider-arrow left-arrow" onClick={handlePrev}>
                    <ChevronLeft size={24} />
                </button>
                <button className="slider-arrow right-arrow" onClick={handleNext}>
                    <ChevronRight size={24} />
                </button>

                <div className="hero-slider-dots">
                    {slides.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
