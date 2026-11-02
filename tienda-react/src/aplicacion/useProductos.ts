import { useEffect, useState } from "react";
import type { EstadoCarga, Producto } from "../dominio/tipos";
import { obtenerProductos } from "../infraestructura/api";

export function useProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [estado, setEstado] = useState<EstadoCarga>('cargando');
    const [esRespaldo, setEsRespaldo] = useState(false);
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        const controlador = new AbortController();
        async function cargar() {
            try {
                const resultado = await obtenerProductos(controlador.signal);
                setProductos(resultado.productos);
                setEsRespaldo(resultado.esRespaldo);
                setEstado('listo');
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') return;
                console.warn('Fallo imprevisto al cargar', error);
                setEstado('error');
            }
        }
        cargar();
        return () => controlador.abort();
    }, [intento]);

    function reintentar() {
        setEstado('cargando');
        setIntento((i) => i + 1);
    }

    return { productos, estado, esRespaldo, reintentar };
}
