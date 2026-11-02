import { Link } from "react-router-dom";
import formatearPrecio from "../formato";
import type { DatosEnvio, Errores, Pedido } from "../../dominio/tipos";
import { useState, type FormEvent } from "react";
import { guardarPedido } from "../../infraestructura/pedidos";
import { useCart } from "../../aplicacion/useCart";
import { useFormulario } from "../../aplicacion/useFormulario";
import CampoFormulario from "../components/CampoFormulario";

const ENVIO_VACIO : DatosEnvio = { nombre : '', email: '', direccion: '', telefono:'' };

function validar (form : DatosEnvio) : Errores<DatosEnvio> {
    const errores : Errores<DatosEnvio> = {}
    if(form.nombre.trim().length < 3) errores.nombre = 'Escribe al menos 3 caracteres';
    if(!/^\S+@\S+\.\S+$/.test(form.email)) errores.email = 'Escribe un correo electronico valido';
    if(form.direccion.trim().length < 5) errores.direccion = 'Escribe una direccion mas completa';
    if(!/^[0-9\s+-]{7,}$/.test(form.telefono)) errores.telefono = 'Escriba almenos 7 digitos';
    return errores;
}
export default function Checkout () {
    const {total, items, vaciar } = useCart();
    const { valores, hayErrores, cambiar, marcar, marcarTodos, errorVisible } = useFormulario(ENVIO_VACIO, validar);
    const [numeroPedido, setNumeroPedido] = useState(0);
    function enviar(e : FormEvent) {
        e.preventDefault();
        marcarTodos();
        if(hayErrores) return;
        const pedido : Pedido = {
            id : Date.now(),
            fecha : new Date().toISOString(),
            cliente: valores,
            items : items,
            total : total
        };
        guardarPedido(pedido);
        setNumeroPedido(pedido.id);
        vaciar();
    }
    if(numeroPedido !== 0){
        return( 
            <div className="p-6">
                <h1 className="text-2xl font-bold">Gracias por tu compra</h1>
                <p className="mt-2 text-sm text-gray-500">Tu pedido Nro. {numeroPedido} quedo registrado</p>
                <Link to="/" className="underline">Volver al catalogo</Link>
            </div>
        )
    }
    if(items.length === 0) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Tu carrito esta vacio: no hay nada que pagar</p>
                <Link to="/" className="underline">Volver al catalogo</Link>
            </div>
        )
    }
    return(
        <form className="flex max-w-md flex-col gap-3" onSubmit={enviar} noValidate>
            <h1 className="text-2xl font-bold">Datos de envio</h1>
            <CampoFormulario etiqueta="Nombre completo" valor={valores.nombre} autoComplete="name"
                onChange={cambiar('nombre')} onBlur={marcar('nombre')} error={errorVisible('nombre')}/>
            <CampoFormulario etiqueta="Correo electronico" tipo="email" valor={valores.email} autoComplete="email"
                onChange={cambiar('email')} onBlur={marcar('email')} error={errorVisible('email')}/>
            <CampoFormulario etiqueta="Direccion" valor={valores.direccion} autoComplete="street-address"
                onChange={cambiar('direccion')} onBlur={marcar('direccion')} error={errorVisible('direccion')}/>
            <CampoFormulario etiqueta="Telefono" tipo="tel" valor={valores.telefono} autoComplete="tel"
                onChange={cambiar('telefono')} onBlur={marcar('telefono')} error={errorVisible('telefono')}/>
            <p className="text-sm">Total a pagar : <b>{formatearPrecio(total)}</b></p>
            <button type="submit" className="mt-2 rounded-full border px-4 py-2 disabled:opacity-50" disabled={hayErrores}>Confirmar pedido</button>
        </form>
    )
}