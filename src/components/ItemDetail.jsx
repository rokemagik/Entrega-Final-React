import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

function ItemDetail({ item }) {
    const { addToCart } = useContext(CartContext);
    const [added, setAdded] = useState(false);

    if (!item) return <p>Cargando producto...</p>;

    const handleAdd = (cantidad) => {
        addToCart(item, cantidad);
        setAdded(true);
    };

    return (
        <div className="item-detail">
            <Link to="/">
                <i className="bi bi-arrow-left-short"></i> Atras
            </Link>

            <div>
                <img src={item.imagen} alt={item.nombre} />

                <div>
                    <h2>{item.nombre}</h2>
                    <p>{item.descripcion}</p>
                    <h3>${item.precio}</h3>

                    {item.stock === 0 && <p>Sin stock</p>}

                    {!added && item.stock > 0 && (
                        <ItemCount stock={item.stock} onAdd={handleAdd} />
                    )}

                    {added && (
                        <Link to="/cart">
                            <button>Ir al carrito</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;