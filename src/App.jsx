import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListingsPage from './pages/ListingsPage';
import NotificationsPage from './pages/NotificationsPage';
import WishlistPage from './pages/WishlistPage';
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

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar
          onSearch={setSearchQuery}
          onLocationChange={setSelectedLocation}
          selectedLocation={selectedLocation}
          onLoginClick={() => setAuthModal('login')}
          onSellClick={() => setSellModal(true)}
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
                />
              }
            />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
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
