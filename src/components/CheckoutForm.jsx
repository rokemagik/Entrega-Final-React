import { useState } from "react";
import { createOrder } from "../firebase/config";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const order = {
      items: cart.map(i => ({ id: i.id, nombre: i.nombre, precio: i.precio, cantidad: i.cantidad })),
      total: getTotalPrice()
    };
    try {
      const orderId = await createOrder(order);
      clearCart();
      navigate(`/checkout/success/${orderId}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>Confirmar compra</button>
    </form>
  );
}