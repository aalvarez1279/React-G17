import { useState, type ChangeEvent } from "react";
import type { Errores } from "../dominio/tipos";

type Tocados<T> = Partial<Record<keyof T, boolean>>;

export function useFormulario<T extends { [K in keyof T] : string }>(
    inicial : T,
    validar : (valores : T) => Errores<T>
) {
    const [valores, setValores] = useState<T>(inicial);
    const [tocados, setTocados] = useState<Tocados<T>>({});

    // Derivados: se calculan en cada render, no son estado
    const errores = validar(valores);
    const hayErrores = Object.keys(errores).length > 0;

    const cambiar = (campo : keyof T) => (e : ChangeEvent<HTMLInputElement>) =>
        setValores((actual) => ({ ...actual, [campo] : e.target.value }));

    const marcar = (campo : keyof T) => () =>
        setTocados((actual) => ({ ...actual, [campo] : true }));

    function marcarTodos() {
        const todos : Tocados<T> = {};
        for (const campo of Object.keys(inicial) as (keyof T)[]) todos[campo] = true;
        setTocados(todos);
    }

    // El error de un campo solo se muestra si el usuario ya salio de el
    function errorVisible(campo : keyof T) : string | undefined {
        return tocados[campo] ? errores[campo] : undefined;
    }

    return { valores, errores, hayErrores, cambiar, marcar, marcarTodos, errorVisible };
}
