import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './Categories.css'

export default function Categories(){
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')

  useEffect(() => {
    const cat = searchParams.get('cat')
    const search = searchParams.get('search')
    if (cat) {
      setFilter(cat)
    }
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  // Filter by category and search term
  let list = products.filter(p => {
    const matchCategory = !filter || p.category === filter
    const matchSearch = !searchTerm || 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchCategory && matchSearch
  })

  // Apply sorting
  if(sort === 'price-low') list = [...list].sort((a,b)=>a.price-b.price)
  if(sort === 'price-high') list = [...list].sort((a,b)=>b.price-a.price)
  // if(sort === 'popular') list = [...list].sort((a,b)=>b.rating-a.rating)

  const categories = ['Birthday Gifts', 'Anniversary Gifts', 'Flowers', 'Chocolates', 'Custom Gifts']

  return (
    <div className="page categories-page">
      <section className="categories-hero">
        <h1>Explore All Products</h1>
        <p>Find the perfect gift from our curated collection</p>
      </section>

      <div className="categories-container">
        <aside className="filters-panel">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <h3 style={{border:"none"}}>Category</h3>
            <select 
              onChange={e=>setFilter(e.target.value)} 
              value={filter}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <h3 style={{border:"none"}}>Sort By</h3>
            <select 
              onChange={e=>setSort(e.target.value)} 
              value={sort}
              className="filter-select"
            >
      
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {(filter || searchTerm) && (
            <button 
              className="reset-btn"
              onClick={() => {
                setFilter('')
                setSearchTerm('')
              }}
            >
              ✕ Clear Filters
            </button>
          )}
        </aside>

        <section className="results">
          <div className="results-header">
            <p className="results-count">
              {list.length} product{list.length !== 1 ? 's' : ''} found
            </p>
          </div>
          {list.length > 0 ? (
            <div className="product-grid">
              {list.map(p=> <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="no-results">
              <p>😔 No products found matching your criteria</p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setFilter('')
                  setSearchTerm('')
                }}
              >
                Clear Filters & Try Again
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
