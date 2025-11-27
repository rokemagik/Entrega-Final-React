import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

function NavBar() {
    return (
        <div className="contenedor">
            <div className="contenedor_barra-principal">
                <div className="buscador">
                    <h1 className="titulo">TechZone</h1>
                    <input
                        type="text"
                        placeholder="Buscar productos"
                    />
                    <button className="boton"><i className="bi bi-search"></i></button>
                </div>
                <nav className="navegacion">
                    <Link to="/">
                        Inicio
                    </Link>
                    <a href=""><i className="bi bi-bag-fill"></i> Productos</a>
                    <a href=""><i className="bi bi-person-fill"></i> Contacto</a>
                    <Link to="/cart">
                        <CartWidget />
                    </Link>
                </nav>
            </div>
            <div className="contenedor_barra-secundario">
                <nav className="navegacion">
                    <a href=""><i className="bi bi-chevron-down"></i> CATEGORIAS</a>
                    <a href="">Pc de escritorio</a>
                    <a href="">Notebooks</a>
                    <a href="">Monitores</a>
                    <a href="">Microprocesadores</a>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;