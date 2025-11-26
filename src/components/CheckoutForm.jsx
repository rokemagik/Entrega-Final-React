import { useState } from "react";
import { createOrder } from "../firebase/config";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const order = {
      buyer: { name, email },
      items: cart.map(i => ({ id: i.id, nombre: i.nombre, precio: i.precio, cantidad: i.cantidad })),
      total: getTotalPrice(),
      createdAt: new Date()
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
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre y Apellido" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
      <button type="submit" disabled={loading}>Confirmar compra</button>
    </form>
  );
}