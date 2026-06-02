import { useState } from 'react'
import './ImageSlider.css'

export default function ImageSlider({ images = [] }) {
  const [idx, setIdx] = useState(0)
  if (!images.length) return null
  return (
    <div className="image-slider">
      <div className="main" style={{backgroundImage:`url(${images[idx]})`}} />
      <div className="thumbs">
        {images.map((src, i) => (
          <button key={i} className={i===idx? 'active' : ''} onClick={() => setIdx(i)} style={{backgroundImage:`url(${src})`}} />
        ))}
      </div>
    </div>
  )
}
