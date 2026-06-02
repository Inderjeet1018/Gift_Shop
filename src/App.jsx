import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Categories from './pages/Categories'
import Trending from './pages/Trending'
import Deals from './pages/Deals'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import Blog from './components/Blog'
import Account from './pages/Account'
import Register from './pages/Register'

function App() {
  useEffect(() => {
    const handler = () => {
      try {
        sessionStorage.removeItem('session')
      } catch (err) {
        // ignore
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [])

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app-root">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/account" element={<Account />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
