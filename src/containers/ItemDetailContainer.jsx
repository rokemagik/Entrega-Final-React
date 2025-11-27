import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc} from "firebase/firestore";
import { db } from "../firebase/config";
import ItemDetail from "../components/ItemDetail";
import '../index.scss';

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
                ? <p className="cargando">Cargando producto...</p>
                : <ItemDetail item={item} />
            }
        </div>
    );
}