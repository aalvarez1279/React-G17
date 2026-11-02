import { Link } from "react-router-dom";
import formatearPrecio from "../formato";
import { IGV, type Producto } from "../../dominio/tipos";
import EtiquetaStock from "./EtiquetaStock";

interface Props {
  producto : Producto;
  onAgregar : (producto : Producto) => void;
}

export default function ProductCard({ producto, onAgregar } : Props) {
  const agotado = producto.stock === 0;
  return (
    <article className={`rounded-xl border p-4 ${agotado ? 'opacity-50' : ''}`}>
        <Link to={`/producto/${producto.id}`}>
          <img src={producto.imagen} alt={producto.nombre} className="mb-3 aspect-square object-contain" />
        </Link>
        <p className="text-sm text-gray-500">{producto.marca}</p>
        <h2 className="font-semibold">
          <Link to={`/producto/${producto.id}`} className="hover:underline">{producto.nombre}</Link>
        </h2>
        <p className="text-sm">{agotado ? 'Agotado' : `${producto.stock} disponibles`}</p>
        <EtiquetaStock stock={producto.stock}/>
        <p className="text-xs text-gray-500">{formatearPrecio(producto.precio * (1 + IGV))} con IGV</p>
        <p className="mt-2">{formatearPrecio(producto.precio)}</p>
        <button className="mt-3 rounded-full border px-4 text-sm" disabled={agotado}
        onClick={() => onAgregar(producto)}
        >
          {agotado ? 'Agotado' : 'Agregar al carrito'}
        </button>
    </article>
  )
}