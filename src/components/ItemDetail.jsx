import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

function ItemDetail({ item }) {
    const { addItem } = useContext(CartContext);
    const [added, setAdded] = useState(false);

    const handleAdd = (cantidad) => {
        addItem(item, cantidad);
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

                    {/* Sin stock */}
                    {item.stock === 0 && <p>Sin stock</p>}

                    {/* Mostrar ItemCount sólo si NO agregó algo */}
                    {!added && item.stock > 0 && (
                        <ItemCount stock={item.stock} onAdd={handleAdd} />
                    )}

                    {/* Mostrar botón ir al carrito si YA agregó */}
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