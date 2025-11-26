import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // items: {id, nombre, precio, cantidad, stock, imagen}

  function addItem(item, qty) {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.map(p => p.id === item.id ? { ...p, cantidad: Math.min(p.stock, p.cantidad + qty) } : p);
      }
      return [...prev, { ...item, cantidad: qty }];
    });
  }

  function removeItem(id) {
    setCart(prev => prev.filter(p => p.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  function getTotalCount() {
    return cart.reduce((s, i) => s + i.cantidad, 0);
  }

  function getTotalPrice() {
    return cart.reduce((s, i) => s + i.cantidad * i.precio, 0);
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, getTotalCount, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}