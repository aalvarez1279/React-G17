export interface Producto {
    id : number;
    nombre : string;
    marca: string;
    precio : number;
    imagen : string;
    stock : number;
    categoria : string;
}
export const NOMBRE_TIENDA = 'Tienda Tech';
export const IGV = 0.18;
export type Categoria = 'todas'| 'laptops'|'audio'|'relojes'|'computadoras';
export type EstadoCarga = 'cargando' | 'listo' | 'error';

export interface ItemCarrito  {
    id: number;
    nombre : string;
    precio : number;
    cantidad : number;
}

export interface DatosEnvio {
    nombre: string;
    email : string; 
    direccion : string;
    telefono : string;
}

export interface Pedido {
    id: number;
    fecha : string;
    cliente : DatosEnvio;
    items : ItemCarrito[];
    total : number;
}

export interface Usuario {
    id : number; 
    nombre : string;
    email : string ; 
    token : string;
    expiraEn: number;
}

export type Errores<T> = Partial<Record<keyof T, string>>;

export interface DatosRegistro {
    nombre : string;
    apellido : string;
    usuario : string;
    email : string;
    clave : string;
    confirmacion : string;
}