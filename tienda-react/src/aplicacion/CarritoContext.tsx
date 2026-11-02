import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ItemCarrito, Producto } from "../dominio/tipos";
import { agregarItem, quitarItem } from "../dominio/carrito";
import { guardarCarrito, leerCarrito } from "../infraestructura/almacen";

interface ValorCarrito {
    items : ItemCarrito[];
    unidades : number;
    total : number ;
    agregar: (producto : Producto) => void;
    quitar: (id : number) => void;
    vaciar: () => void;
}

export const CarritoContext = createContext<ValorCarrito | null>(null);

export function CarritoProvider({children} : {children : ReactNode}) {
    const [carrito, setCarrito] = useState<ItemCarrito[]>(leerCarrito);
    useEffect(() => {
        guardarCarrito(carrito);
    }, [carrito]);
    const unidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);
    const total = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
    function agregar(producto : Producto) {
        setCarrito((actual) => agregarItem(producto, actual));
    }
    function quitar(id : number) {
        setCarrito((actual) => quitarItem(actual, id));
    }
    function vaciar() {
        setCarrito([]);
    }

    return(
        <CarritoContext.Provider value={{items : carrito, unidades, total, agregar, quitar, vaciar}}>
            {children}
        </CarritoContext.Provider>
    )
}
