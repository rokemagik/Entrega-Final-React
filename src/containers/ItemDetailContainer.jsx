import { useEffect, useState } from "react";
import { getProductById } from "../firebase/config";
import { useParams } from "react-router-dom";
import ItemDetail from "../components/ItemDetail";

export default function ItemDetailContainer() {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(idProducto)
      .then(p => setProducto(p))
      .finally(() => setLoading(false));
  }, [idProducto]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return <ItemDetail producto={producto} />;
}
