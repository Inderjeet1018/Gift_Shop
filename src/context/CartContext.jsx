import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const STORAGE_KEY = 'giftshop_v1'
const CartContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a `CartProvider`')
  }
  return context
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}:cart`)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}:wishlist`)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try { localStorage.setItem(`${STORAGE_KEY}:cart`, JSON.stringify(cart)) } catch (e) {}
  }, [cart])

  useEffect(() => {
    try { localStorage.setItem(`${STORAGE_KEY}:wishlist`, JSON.stringify(wishlist)) } catch (e) {}
  }, [wishlist])

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) return prev.map((p) => p.id === product.id ? { ...p, qty: (p.qty || 1) + qty } : p)
      return [...prev, { ...product, qty }]
    })
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      // remove item if qty is zero or negative
      setCart((prev) => prev.filter((p) => p.id !== id))
      return
    }
    setCart((prev) => prev.map((p) => p.id === id ? { ...p, qty } : p))
  }

  function clearCart() {
    setCart([])
  }

  function toggleWishlist(product) {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev.filter((p) => p.id !== product.id)
      return [...prev, product]
    })
  }

  function moveToCart(product, qty = 1) {
    // add to cart and remove from wishlist
    addToCart(product, qty)
    setWishlist((prev) => prev.filter((p) => p.id !== product.id))
  }

  const totalItems = useMemo(() => cart.reduce((s, p) => s + (p.qty || 1), 0), [cart])
  const totalPrice = useMemo(() => cart.reduce((s, p) => s + ((p.price || 0) * (p.qty || 1)), 0), [cart])

  const value = { cart, wishlist, addToCart, removeFromCart, updateQty, toggleWishlist, moveToCart, clearCart, totalItems, totalPrice }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
