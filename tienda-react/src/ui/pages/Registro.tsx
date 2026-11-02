import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormulario } from "../../aplicacion/useFormulario";
import { useSesion } from "../../aplicacion/useSesion";
import { REGISTRO_VACIO, validarRegistro } from "../../dominio/registro";
import { registrarUsuario } from "../../infraestructura/auth";
import CampoFormulario from "../components/CampoFormulario";

export default function Registro() {
    const { valores, hayErrores, cambiar, marcar, marcarTodos, errorVisible } =
        useFormulario(REGISTRO_VACIO, validarRegistro);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState('');
    const [registrado, setRegistrado] = useState<string | null>(null);
    const { usuario : sesion } = useSesion();

    if (sesion) return <Navigate to="/" replace/>;

    async function enviar(e : FormEvent) {
        e.preventDefault();
        marcarTodos();
        if (hayErrores) return;
        setError('');
        setEnviando(true);
        try {
            const nuevo = await registrarUsuario(valores);
            setRegistrado(nuevo.firstName);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo crear la cuenta.');
        } finally {
            setEnviando(false);
        }
    }

    if (registrado) {
        return (
            <div className="mx-auto max-w-sm p-6">
                <h1 className="text-2xl font-bold">Cuenta creada</h1>
                <p className="mt-2 text-sm">Bienvenido, {registrado}. Ya puedes iniciar sesion.</p>
                <p className="mt-2 text-xs text-gray-500">
                    Nota: la API de prueba (DummyJSON) simula el registro y no guarda la cuenta.
                    Para entrar usa el usuario de prueba emilys / emilyspass.
                </p>
                <Link to="/login" className="mt-4 inline-block underline">Ir a iniciar sesion</Link>
            </div>
        )
    }

    return (
        <form onSubmit={enviar} noValidate className="mx-auto flex max-w-sm flex-col gap-3">
            <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
            <CampoFormulario etiqueta="Nombre" valor={valores.nombre} autoComplete="given-name"
                onChange={cambiar('nombre')} onBlur={marcar('nombre')} error={errorVisible('nombre')}/>
            <CampoFormulario etiqueta="Apellido" valor={valores.apellido} autoComplete="family-name"
                onChange={cambiar('apellido')} onBlur={marcar('apellido')} error={errorVisible('apellido')}/>
            <CampoFormulario etiqueta="Usuario" valor={valores.usuario} autoComplete="username"
                onChange={cambiar('usuario')} onBlur={marcar('usuario')} error={errorVisible('usuario')}/>
            <CampoFormulario etiqueta="Correo electronico" tipo="email" valor={valores.email} autoComplete="email"
                onChange={cambiar('email')} onBlur={marcar('email')} error={errorVisible('email')}/>
            <CampoFormulario etiqueta="Contrasena" tipo="password" valor={valores.clave} autoComplete="new-password"
                onChange={cambiar('clave')} onBlur={marcar('clave')} error={errorVisible('clave')}/>
            <CampoFormulario etiqueta="Confirmar contrasena" tipo="password" valor={valores.confirmacion} autoComplete="new-password"
                onChange={cambiar('confirmacion')} onBlur={marcar('confirmacion')} error={errorVisible('confirmacion')}/>
            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
            <button type="submit" className="mt-2 rounded-full border px-4 py-2 disabled:opacity-50"
                disabled={enviando || hayErrores}>
                {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
            <p className="text-sm">
                ¿Ya tienes cuenta? <Link to="/login" className="underline">Inicia sesion</Link>
            </p>
        </form>
    )
}
