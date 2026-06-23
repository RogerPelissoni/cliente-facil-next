import { http } from "@/lib/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User, UserFormData } from "./user.types";

export async function getUsers() {
    const response = await http.get<User[]>("/users");

    return response.data;
}

export async function createUser(data: UserFormData) {
    const response = await http.post("/users", data);

    return response.data;
}

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
}