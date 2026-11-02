import type { ItemCarrito, Usuario } from "../dominio/tipos";

const CLAVE_SESION = 'tienda_sesion';
const CLAVE_CARRITO = 'tienda_carrito';

// ---------- Sesión ----------
export function leerSesion() : Usuario | null {
    try {
        const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_SESION) ?? 'null');
        if(
            typeof crudo === 'object' && crudo !== null
            && typeof (crudo as Usuario).token === 'string'
            && typeof (crudo as Usuario).expiraEn === 'number'
            && (crudo as Usuario).expiraEn > Date.now()
        ) {
            return crudo as Usuario;
        }
        return null;
    } catch (error) {
        console.warn('Sesion guardada invalida', error);
        return null;
    }
}

export function guardarSesion(usuario : Usuario) {
    try {
        localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
    } catch (error) {
        console.warn('No se pudo guardar la sesion', error);
    }
}

export function borrarSesion () {
    localStorage.removeItem(CLAVE_SESION);
}

// ---------- Carrito ----------
function esItemCarrito(valor : unknown) : valor is ItemCarrito {
    if (typeof valor !== 'object' || valor === null) return false;
    const item = valor as ItemCarrito;
    return typeof item.id === 'number'
        && typeof item.nombre === 'string'
        && typeof item.precio === 'number'
        && Number.isInteger(item.cantidad) && item.cantidad > 0;
}

export function leerCarrito() : ItemCarrito[] {
    try {
        const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]');
        return Array.isArray(crudo) ? crudo.filter(esItemCarrito) : [];
    } catch (error) {
        console.warn('Carrito guardado invalido', error);
        return [];
    }
}

export function guardarCarrito(items : ItemCarrito[]) {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
    } catch (error) {
        console.warn('No se pudo guardar el carrito', error);
    }
}