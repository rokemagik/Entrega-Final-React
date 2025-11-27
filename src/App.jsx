import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./containers/ItemListContainer";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="Bienvenido" />} />
        <Route path="/categoria/:idCategoria" element={<ItemListContainer greeting="Categoría"/>} />
        <Route path="/detalle/:idProducto" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/checkout/success/:orderId" element={<div>Compra confirmada</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App; 