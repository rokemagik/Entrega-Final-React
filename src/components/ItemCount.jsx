import { useState } from "react";

export default function ItemCount({ stock = 10, initial = 1, onAdd }) {
  const [qty, setQty] = useState(initial);

  function inc() { if (qty < stock) setQty(q => q + 1); }
  function dec() { if (qty > 1) setQty(q => q - 1); }

  return (
    <div className="item-count">
      <button onClick={dec}>-</button>
      <span>{qty}</span>
      <button onClick={inc}>+</button>
      <button onClick={() => onAdd(qty)} disabled={stock <= 0}>Agregar al carrito</button>
      {stock <= 0 && <p>Sin stock</p>}
    </div>
  );
}