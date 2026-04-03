import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/AdvertisementSection.css';
import adCar from '../assets/ad_car_3d.png';
import adBike from '../assets/ad_bike_3d.png';
import adScooter from '../assets/ad_scooter_3d.png';

const ads = [
    {
        id: 1,
        title: "Sell Faster, Buy Smarter",
        desc: "Turn your pre-loved vehicles into cash today.",
        img: adCar,
        btn: "Explore Market →"
    },
    {
        id: 2,
        title: "Find Your Next Adventure",
        desc: "Thousands of verified bikes waiting for you.",
        img: adBike,
        btn: "View Top Deals →"
    },
    {
        id: 3,
        title: "Go Electric, Go Anywhere",
        desc: "Discover future-ready rides near your location.",
        img: adScooter,
        btn: "Shop EV Now →"
    }
];

export default function AdvertisementSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % ads.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <section className="ads-section container">
            <div className="ads-slider-container">
                <button className="slider-btn prev-btn" onClick={handlePrev}>
                    <ChevronLeft size={24} />
                </button>
                
                <div className="ads-slider">
                    {ads.map((ad, index) => {
                        let position = "next";
                        if (index === currentIndex) position = "active";
                        else if (index === (currentIndex - 1 + ads.length) % ads.length) position = "prev";

                        return (
                            <div className={`ad-slide ${position}`} key={ad.id}>
                                <div className="ad-slide-content">
                                    <h3>{ad.title}</h3>
                                    <p>{ad.desc}</p>
                                    <button className="ad-explore">{ad.btn}</button>
                                </div>
                                <div className="ad-slide-image-wrapper">
                                    <img src={ad.img} alt={ad.title} className="ad-slide-img" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="slider-btn next-btn" onClick={handleNext}>
                    <ChevronRight size={24} />
                </button>

                <div className="slider-dots">
                    {ads.map((_, idx) => (
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
