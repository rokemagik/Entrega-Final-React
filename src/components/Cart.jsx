import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h1>Carrito de compras</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div>
            {cart.map(prod => (
              <div key={prod.id}>
                <p>{prod.nombre}</p>
                <p>Precio: ${prod.precio}</p>
                <p>Cantidad: {prod.cantidad}</p>
                <button onClick={() => removeFromCart(prod.id)}>Eliminar</button>
              </div>
            ))}
          </div>

          <h3>Total: ${getTotalPrice()}</h3>

          <button onClick={clearCart}>
            Vaciar carrito
          </button>

          <button onClick={clearCart}>
            Comprar
          </button>

        </>
      )}
    </div>
  );
};

export default Cart;