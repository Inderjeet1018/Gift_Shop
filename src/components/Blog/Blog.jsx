import { useState } from 'react'
import './Blog.css'

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('')

  const blogPosts = [
    {
      id: 1,
      title: 'Top 5 Gift Ideas for Her Birthday',
      category: 'Gifts',
      date: 'Dec 10, 2024',
     image: 'https://imgs.search.brave.com/QfwvoIgZtRDZGGE112YGIt7aaVlXS__Kw4yTRL-Rno0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbm4uY29tL2Fw/aS92MS9pbWFnZXMv/c3RlbGxhci9wYXJz/ZWx5L3ByYWN0aWNh/bC1naWZ0cy1jbm51/LmpwZz9jPTE2eDkm/cT1oXzI3MCx3XzQ4/MCxjX2ZpbGw',
      excerpt: 'Discover the perfect birthday gifts that will make her smile. From personalized boxes to luxury chocolates.',
      author: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'The Art of Flower Arrangements',
      category: 'Flowers',
      date: 'Dec 8, 2024',
      image: 'https://i0.wp.com/homeiswheretheboatis.net/wp-content/uploads/2021/04/The-Art-of-Flowers1.jpg?resize=760%2C608&quality=89&ssl=1',
      excerpt: 'Learn how to create stunning flower arrangements that last longer and look more beautiful.',
      author: 'Emma Davis'
    },
    {
      id: 3,
      title: 'Anniversary Gifts That Express Your Love',
      category: 'Anniversaries',
      date: 'Dec 5, 2024',
      image: 'https://www.sendbestgift.com/blog/wp-content/uploads/Looking-for-First-Anniversary-Gifts-for-Your-Wife-or-Husband.jpg',
      excerpt: 'Make your anniversary special with thoughtfully curated gifts that show how much you care.',
      author: 'Michael Chen'
    },
    {
      id: 4,
      title: 'Luxury Chocolates: A Tasting Guide',
      category: 'Chocolates',
      date: 'Nov 28, 2024',
      image: 'https://cdn.media.amplience.net/i/marsethelm/collection-milk-chocolate_img_10?%24i%24=&w=3840&fmt=auto&qlt=default',
      excerpt: 'Explore the world of premium chocolates and learn how to appreciate their rich flavors.',
      author: 'Jessica Miller'
    },
    {
      id: 5,
      title: 'Corporate Gift Ideas for Your Team',
      category: 'Corporate',
      date: 'Nov 20, 2024',
      image: 'https://www.boxupgifting.com/cdn/shop/files/TheHero_shamper1copy.webp?v=1729162178&width=500',
      excerpt: 'Strengthen team bonds with thoughtful corporate gifts that show appreciation.',
      author: 'Robert Wilson'
    },
    {
      id: 6,
      title: 'Budget-Friendly Gifts That Look Premium',
      category: 'Budget Tips',
      date: 'Nov 15, 2024',
      image: 'https://www.boxupgifting.com/cdn/shop/files/Nature_sPleasureGiftBoxINFOcopy2_800x.webp?v=1729161354&width=500',
      excerpt: 'Prove that you don\'t need to spend a fortune to give impressive gifts.',
      author: 'Lisa Anderson'
    }
  ]

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page blog-page">
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1>Our Blog</h1>
          <p>Gift ideas, inspiration, and stories from our community</p>
        </div>
      </section>

      <section className="blog-search">
        <div className="container">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          <div className="blog-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <article key={post.id} className="blog-card">
                  <div className="blog-image" style={{ backgroundImage: `url(${post.image})` }}>
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-body">
                    <h3>{post.title}</h3>
                    <div className="blog-meta">
                      <span className="date">📅 {post.date}</span>
                      <span className="author">✍️ {post.author}</span>
                    </div>
                    <p>{post.excerpt}</p>
                    <a href="#" className="read-more">Read More →</a>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-results">
                <p>No articles found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
