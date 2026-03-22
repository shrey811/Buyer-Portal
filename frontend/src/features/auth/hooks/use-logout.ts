import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AUTH_ME_QUERY_KEY } from "../../../hooks/use-auth";
import { storage } from "../../../lib/storage";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return () => {
        storage.removeToken();
        queryClient.removeQueries({ queryKey: AUTH_ME_QUERY_KEY });
        navigate("/login", { replace: true });
    };
};