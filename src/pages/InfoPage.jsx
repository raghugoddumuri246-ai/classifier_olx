import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import '../styles/InfoPage.css';

const contentMap = {
    'about': {
        title: 'About Us',
        content: `
            <h3>Welcome to Our Marketplace</h3>
            <p>We are the leading platform for buying and selling premium goods locally and globally. Our mission is to connect buyers with sellers in a secure, transparent, and seamless environment.</p>
            <p>From electronics to real estate, our curated collections ensure that every transaction meets the highest standards of quality and trust.</p>
            <h3>Our Vision</h3>
            <p>To redefine digital classifieds through modern technology, intuitive design, and prioritizing user safety.</p>
        `
    },
    'privacy': {
        title: 'Privacy Policy',
        content: `
            <h3>Data Protection & Privacy</h3>
            <p>Your privacy is our paramount concern. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
            <ul>
                <li><strong>Data Collection:</strong> We collect necessary account details to facilitate trading.</li>
                <li><strong>Data Security:</strong> Industry-standard encryption safeguards all communication.</li>
                <li><strong>Third Parties:</strong> We do not sell your data to any third-party advertisers.</li>
            </ul>
        `
    },
    'terms': {
        title: 'Terms of Service',
        content: `
            <h3>Platform Rules & Guidelines</h3>
            <p>By using our services, you agree to these legal terms. We reserve the right to suspend accounts violating community guidelines.</p>
            <p><strong>Prohibited Items:</strong> Selling illegal, counterfeit, or hazardous materials is strictly forbidden and monitored.</p>
            <p><strong>Liability:</strong> We act strictly as a venue. We are not responsible for disputes arising directly between buyers and sellers, though we provide mediation tools.</p>
        `
    }
};

export default function InfoPage() {
    const { pageId } = useParams();
    const navigate = useNavigate();
    
    const pageData = contentMap[pageId];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageId]);

    if (!pageData) {
        return (
            <div className="info-page-container not-found">
                <h2>Page Not Found</h2>
                <button onClick={() => navigate('/')} className="btn-primary">Return Home</button>
            </div>
        );
    }

    return (
        <div className="info-page-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} />
                <span>Back</span>
            </button>
            
            <article className="info-article">
                <h1 className="info-title">{pageData.title}</h1>
                <div 
                    className="info-content" 
                    dangerouslySetInnerHTML={{ __html: pageData.content }} 
                />
            </article>
        </div>
    );
}
