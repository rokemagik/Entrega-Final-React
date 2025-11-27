import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemDetail from "../components/ItemDetail";

export default function ItemDetailContainer() {
    const { idProducto } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {

        const docRef = doc(db, "products", idProducto);

        getDoc(docRef)
            .then((snap) => {
                if (snap.exists()) {
                    setItem({ id: snap.id, ...snap.data() });
                }
            });

    }, [idProducto]);

    return (
        <div className="contenedor_productos">
            {!item 
                ? <p>Cargando producto...</p>
                : <ItemDetail item={item} />
            }
        </div>
    );
}