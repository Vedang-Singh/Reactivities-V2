import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import { useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () =>
{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) =>
        {
            await agent.post("/login?useCookies=true", creds)
        },
        onSuccess: async () =>
        {
            // will force react query to get the current user
            await queryClient.invalidateQueries({ queryKey: ["user"] });
            await navigate("/activities");
        }
    });

    const logoutUser = useMutation({
        mutationFn: async () => await agent.post("/account/logout"),
        onSuccess: () =>
        {
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.removeQueries({ queryKey: ['activities'] });
            // queryClient.clear(); // Alternatively, can clear all queries
            navigate('/');
        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => await agent.post("/account/register", creds),
        onSuccess: async () =>
        {
            toast.success("Registration successful, please login to continue.");
            navigate("/login");
        }
    });

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ["user"],
        queryFn: async () => (await agent.get<User>("/account/user-info")).data,
        // only run if there is no user in the cache
        enabled: !queryClient.getQueryData(["user"])
    })

    return { loginUser, currentUser, logoutUser, loadingUserInfo, registerUser }
}