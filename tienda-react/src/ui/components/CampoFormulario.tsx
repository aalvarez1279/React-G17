import { useId, type ChangeEvent } from "react";

interface Props {
    etiqueta : string;
    valor : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    onBlur : () => void;
    error? : string;
    tipo? : 'text' | 'email' | 'password' | 'tel';
    autoComplete? : string;
}

export default function CampoFormulario({ etiqueta, valor, onChange, onBlur, error, tipo = 'text', autoComplete } : Props) {
    const id = useId();
    const idError = `${id}-error`;
    return (
        <div className="flex flex-col text-sm">
            <label htmlFor={id}>{etiqueta}</label>
            <input id={id} type={tipo} value={valor} autoComplete={autoComplete}
                onChange={onChange} onBlur={onBlur}
                aria-invalid={!!error} aria-describedby={error ? idError : undefined}
                className={`rounded border px-3 py-2 ${error ? 'border-red-600' : ''}`}
            />
            {error && <span id={idError} className="text-xs text-red-600">{error}</span>}
        </div>
    )
}
