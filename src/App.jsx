import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListingsPage from './pages/ListingsPage';
import NotificationsPage from './pages/NotificationsPage';
import WishlistPage from './pages/WishlistPage';
import ListingDetailPage from './pages/ListingDetailPage';
import InfoPage from './pages/InfoPage';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import SellNowModal from './components/SellNowModal';
import './index.css';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All India');
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'signup'
  const [sellModal, setSellModal] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar
          onSearch={setSearchQuery}
          onLocationChange={setSelectedLocation}
          selectedLocation={selectedLocation}
          onLoginClick={() => setAuthModal('login')}
          onSellClick={() => setSellModal(true)}
          onOpenFilters={() => setFiltersOpen(true)}
          wishlistCount={6}
        />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <ListingsPage
                  searchQuery={searchQuery}
                  selectedLocation={selectedLocation}
                  onSearchChange={setSearchQuery}
                  filtersOpen={filtersOpen}
                  onCloseFilters={() => setFiltersOpen(false)}
                  onOpenFilters={() => setFiltersOpen(true)}
                />
              }
            />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/info/:pageId" element={<InfoPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Modals */}
        {authModal && (
          <AuthModal mode={authModal} onClose={() => setAuthModal(null)} />
        )}
        {sellModal && (
          <SellNowModal onClose={() => setSellModal(false)} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
