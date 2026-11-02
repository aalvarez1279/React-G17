import type { DatosRegistro, Errores } from "./tipos";

export const REGISTRO_VACIO : DatosRegistro = {
    nombre : '', apellido : '', usuario : '', email : '', clave : '', confirmacion : ''
};

export function validarRegistro(datos : DatosRegistro) : Errores<DatosRegistro> {
    const errores : Errores<DatosRegistro> = {};
    if (datos.nombre.trim().length < 2) errores.nombre = 'Escribe al menos 2 caracteres';
    if (datos.apellido.trim().length < 2) errores.apellido = 'Escribe al menos 2 caracteres';
    if (!/^[a-zA-Z0-9_]{4,20}$/.test(datos.usuario)) errores.usuario = 'De 4 a 20 letras, numeros o _ (sin espacios)';
    if (!/^\S+@\S+\.\S+$/.test(datos.email)) errores.email = 'Escribe un correo electronico valido';
    if (datos.clave.length < 8) errores.clave = 'Minimo 8 caracteres';
    else if (!/[0-9]/.test(datos.clave) || !/[a-zA-Z]/.test(datos.clave)) errores.clave = 'Debe tener letras y numeros';
    if (datos.confirmacion !== datos.clave) errores.confirmacion = 'Las contrasenas no coinciden';
    return errores;
}
