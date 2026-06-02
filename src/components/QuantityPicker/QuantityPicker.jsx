import './QuantityPicker.css'

export default function QuantityPicker({ value = 1, onChange }) {
  function dec() { onChange(Math.max(1, value - 1)) }
  function inc() { onChange(value + 1) }
  return (
    <div className="qty-picker">
      <button onClick={dec}>-</button>
      <span>{value}</span>
      <button onClick={inc}>+</button>
    </div>
  )
}
