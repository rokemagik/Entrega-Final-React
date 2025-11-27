import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemList from "../components/ItemList";

function ItemListContainer({ greeting }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { idCategoria } = useParams();

    useEffect(() => {
        setLoading(true);

        const productosRef = collection(db, "products");

        let consulta;

        if (idCategoria) {
            consulta = query(productosRef, where("categoria", "==", idCategoria));
        } else {
            consulta = productosRef;
        }

        getDocs(consulta)
            .then((resp) => {
                const items = resp.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProductos(items);
            })
            .finally(() => setLoading(false));

    }, [idCategoria]);

    if (loading) return <p>Cargando productos...</p>;

    return (
    <div className="contenedor_main">
        <h2>{greeting}</h2>

        <div className="contenedor_productos">
            <ItemList productos={productos} />
        </div>
    </div>
)
}

export default ItemListContainer;