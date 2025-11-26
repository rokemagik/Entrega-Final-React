import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../components/ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ItemListContainer({ greeting }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoriaId } = useParams(); // <-- si estás en /categoria/intel

    useEffect(() => {
        setLoading(true);

        // referencia a la colección
        const productosRef = collection(db, "productos");

        let consulta;

        if (categoriaId) {
            // filtrar por categoría
            consulta = query(productosRef, where("categoria", "==", categoriaId));
        } else {
            consulta = productosRef;
        }

        getDocs(consulta)
            .then((resp) => {
                setProductos(
                    resp.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                );
            })
            .finally(() => setLoading(false));
    }, [categoriaId]);

    if (loading) return <p>Cargando productos...</p>;

    if (productos.length === 0) return <p>No hay productos en esta categoría.</p>;

    return (
        <div className="contenedor_main">
            <h2>{greeting}</h2>
            <ItemList productos={productos} />
        </div>
    );
}