import { NOMBRE_TIENDA } from "../../dominio/tipos";

export default function Footer () {
    return (
        <footer className="mt-8 border-t pt-4 text-sm text-gray-500">
            {NOMBRE_TIENDA} - Proyecto del bloque de React
        </footer>
    )
}