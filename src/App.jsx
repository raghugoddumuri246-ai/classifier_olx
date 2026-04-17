import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListingsPage from './pages/ListingsPage';
import NotificationsPage from './pages/NotificationsPage';
import WishlistPage from './pages/WishlistPage';
import ListingDetailPage from './pages/ListingDetailPage';
import InfoPage from './pages/InfoPage';
import MyProductsPage from './pages/MyProductsPage';
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import UsersList from './admin/pages/UsersList';
import ProductManager from './admin/pages/ProductManager';
import PaymentHistory from './admin/pages/PaymentHistory';
import SliderManagement from './admin/pages/SliderManagement';
import CategoriesManagement from './admin/pages/CategoriesManagement';
import LocationsManagement from './admin/pages/LocationsManagement';
import OffersManagement from './admin/pages/OffersManagement';
import AdminLoginPage from './admin/pages/AdminLoginPage';
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  // Layout for all public pages including Navbar and Footer
  const MainLayout = ({ children }) => (
    <div className="app">
      <Navbar
        onSearch={setSearchQuery}
        onLocationChange={setSelectedLocation}
        selectedLocation={selectedLocation}
        onLoginClick={() => setAuthModal('login')}
        onSellClick={() => setSellModal(true)}
        onOpenFilters={() => setFiltersOpen(true)}
        wishlistCount={6}
        user={user}
        onLogout={handleLogout}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes - No Navbar/Footer */}
        <Route 
          path="/admin/*" 
          element={
            !user ? (
              <AdminLoginPage setUser={setUser} />
            ) : user.role !== 'admin' ? (
              <div className="admin-unauthorized-view">
                <div className="container">
                  <h2>Access Denied</h2>
                  <p>You do not have administrative permissions to view this page.</p>
                  <button onClick={() => window.location.href = '/'}>Return to Home</button>
                </div>
                <style>{`
                  .admin-unauthorized-view { height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: #0B0F19; color: white; }
                  .admin-unauthorized-view h2 { font-size: 32px; margin-bottom: 10px; }
                  .admin-unauthorized-view button { margin-top: 20px; background: #3182CE; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
                `}</style>
              </div>
            ) : (
              <AdminLayout user={user} onLogout={handleLogout} />
            )
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersList />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="payments" element={<PaymentHistory />} />
          <Route path="sliders" element={<SliderManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="locations" element={<LocationsManagement />} />
          <Route path="offers" element={<OffersManagement />} />
        </Route>

        {/* Public Routes with Navbar and Footer */}
        <Route path="*" element={
          <MainLayout>
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
              <Route path="/my-ads" element={<MyProductsPage />} />
              <Route path="/listing/:id" element={<ListingDetailPage />} />
              <Route path="/info/:pageId" element={<InfoPage />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>

      {/* Modals outside layouts to ensure correct layering */}
      {authModal && (
        <AuthModal 
          mode={authModal} 
          onClose={() => setAuthModal(null)} 
          setUser={setUser}
        />
      )}
      {sellModal && (
        <SellNowModal onClose={() => setSellModal(false)} />
      )}
    </BrowserRouter>
  );
}

export default App;
