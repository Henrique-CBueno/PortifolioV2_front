import { Navigate, useLocation } from "react-router-dom";
import type { ReactElement } from "react";
import { isAuthenticated } from "../utils/auth";

interface ProtectedRouteProps {
    children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}
