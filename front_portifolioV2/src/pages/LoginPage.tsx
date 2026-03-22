import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, login } from "../utils/auth";
import axios from "axios";

interface LocationState {
    from?: string;
}

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (isAuthenticated()) {
        return <Navigate to="/adm/cms" replace />;
    }

    const fromState = (location.state as LocationState | null)?.from;
    const fromQuery = new URLSearchParams(location.search).get("from");
    const candidatePath = fromState ?? fromQuery;
    const targetPath = candidatePath && candidatePath.startsWith("/") ? candidatePath : "/adm/cms";

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;

        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const result = await login({ username, password });

            if (!result.ok) {
                setErrorMessage(result.message);
                return;
            }

            navigate(targetPath, { replace: true });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setErrorMessage("Usuario ou senha invalidos.");
            } else {
                setErrorMessage("Nao foi possivel realizar login. Tente novamente.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10 flex items-center justify-center">
            <section className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30">
                <h1 className="text-3xl font-semibold">Entrar no CMS</h1>
                <p className="mt-2 text-sm text-slate-300">Acesso restrito para administradores.</p>

                <form onSubmit={onSubmit} className="mt-8 space-y-4">
                    <div>
                        <label htmlFor="username" className="mb-1 block text-sm text-slate-200">
                            Usuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                            className="w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2 outline-none transition focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm text-slate-200">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            className="w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2 outline-none transition focus:border-blue-400"
                        />
                    </div>

                    {errorMessage && <p className="text-sm text-red-300">{errorMessage}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-brand-accent px-4 py-2 font-medium text-white transition hover:brightness-110"
                    >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                <Link
                    to="/"
                    className="mt-6 inline-flex text-sm text-slate-300 transition hover:text-white"
                >
                    Voltar para o portfolio
                </Link>
            </section>
        </main>
    );
}
