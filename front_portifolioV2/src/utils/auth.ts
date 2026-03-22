import axios from "axios";

const AUTH_STORAGE_KEY = "portfolio-admin-auth";

export interface AuthUser {
    loginAt: number;
    token: string;
    tokenType: string;
}

interface LoginPayload {
    username: string;
    password: string;
}

interface LoginApiResponse {
    token?: string;
    accessToken?: string;
    access_token?: string;
    jwt?: string;
    token_type?: string;
    expires_in?: number;
    refresh_expires_in?: number;
    refresh_token?: string;
}

type LoginApiPayload = LoginApiResponse | string;
let authInterceptorConfigured = false;

export function getCurrentUser(): AuthUser | null {
    const rawValue = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) return null;

    try {
        const parsed = JSON.parse(rawValue) as AuthUser;

        if (!parsed?.loginAt || !parsed?.token) {
            return null;
        }

        if (!parsed?.tokenType) {
            return {
                ...parsed,
                tokenType: "Bearer",
            };
        }

        return parsed;
    } catch {
        return null;
    }
}

export function isAuthenticated() {
    return getCurrentUser() !== null;
}

export function getAuthorizationHeader() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return {};
    }

    return {
        Authorization: `${currentUser.tokenType} ${currentUser.token}`,
    };
}

export async function login(payload: LoginPayload) {
    const response = await axios.post<LoginApiPayload>(
        `${import.meta.env.VITE_ROOT_URL}/portifolio/login`,
        {
            username: payload.username.trim(),
            password: payload.password.trim(),
        }
    );

    const data = response.data;
    const token =
        typeof data === "string"
            ? data.trim()
            : (data?.access_token ?? data?.token ?? data?.accessToken ?? data?.jwt ?? "").trim();
    const tokenType = typeof data === "string" ? "Bearer" : (data?.token_type ?? "Bearer").trim() || "Bearer";

    if (!token) {
        return { ok: false as const, message: "Token de autenticacao nao retornado pelo servidor." };
    }

    const user: AuthUser = {
        loginAt: Date.now(),
        token,
        tokenType,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

    return { ok: true as const, user };
}

export function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function hydrateAuthSession() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return;
    }
}

export function setupAuthInterceptor() {
    if (authInterceptorConfigured) {
        return;
    }

    authInterceptorConfigured = true;

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (!axios.isAxiosError(error)) {
                return Promise.reject(error);
            }

            const status = error.response?.status;
            const requestUrl = error.config?.url ?? "";
            const isLoginRequest = requestUrl.includes("/portifolio/login");
            const headers = error.config?.headers;
            const authHeader = headers && "Authorization" in headers ? String(headers.Authorization ?? "") : "";
            const hasAuthHeader = authHeader.trim().length > 0;

            if (status === 401 && !isLoginRequest && hasAuthHeader) {
                logout();

                if (window.location.pathname !== "/login") {
                    const returnTo = encodeURIComponent(window.location.pathname || "/adm/cms");
                    window.location.href = `/login?from=${returnTo}`;
                }
            }

            return Promise.reject(error);
        }
    );
}
