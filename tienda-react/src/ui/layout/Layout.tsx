import { Suspense, useState } from "react";
import Header from "../components/Header";
import PanelCarrito from "../components/PanelCarrito";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { NOMBRE_TIENDA } from "../../dominio/tipos";

export default function Layout() {
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    return (
        <div className="mx-auto max-w-5xl p-6">
            <Header nombre={NOMBRE_TIENDA} eslogan="Una Vida Tecnologica"/>
            <button className="mb-4 text-sm"
            onClick={() => setCarritoAbierto((abierto) => !abierto)}>
                {carritoAbierto ? 'Ocultar carrito' : 'Ver carrito'}
            </button>
            {carritoAbierto && <PanelCarrito/>}
            <main>
                <Suspense fallback={<p className="p-6 text-gray-500">Cargando...</p>}>
                    <Outlet/>
                </Suspense>
            </main>
            <Footer/>
        </div>
    )
}