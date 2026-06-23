import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User, UserFilters, UserFormData } from "./user.types";

const USER_QUERY_KEY = ["users"];

let users: User[] = [
    {
        id: 1,
        name: "Roger Pelissoni",
        email: "roger@email.com",
    },
    {
        id: 2,
        name: "Administrador",
        email: "admin@email.com",
    },
];

export async function getUsers(
    filters: UserFilters
): Promise<User[]> {
    await new Promise((resolve) =>
        setTimeout(resolve, 300)
    );

    return users.filter((user) => {
        const matchName =
            !filters.name ||
            user.name
                .toLowerCase()
                .includes(
                    filters.name.toLowerCase()
                );

        const matchEmail =
            !filters.email ||
            user.email
                .toLowerCase()
                .includes(
                    filters.email.toLowerCase()
                );

        return (
            matchName &&
            matchEmail
        );
    });
}

export async function getUser(
    id: number
): Promise<User | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return users.find((user) => user.id === id);
}

export async function createUser(
    data: UserFormData
): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user: User = {
        id: Date.now(),
        ...data,
    };

    users.push(user);

    return user;
}

export async function updateUser(
    id: number,
    data: UserFormData
): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = users.findIndex(
        (user) => user.id === id
    );

    if (index === -1) {
        throw new Error("Usuário não encontrado");
    }

    users[index] = {
        ...users[index],
        ...data,
    };

    return users[index];
}

export async function deleteUser(
    id: number
): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    users = users.filter(
        (user) => user.id !== id
    );
}

export function useUsers(
    filters: UserFilters
) {
    return useQuery({
        queryKey: [
            "users",
            filters,
        ],

        queryFn: () =>
            getUsers(filters),
    });
}

export function useUser(id: number) {
    return useQuery({
        queryKey: [...USER_QUERY_KEY, id],
        queryFn: () => getUser(id),
        enabled: !!id,
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEY,
            });
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: UserFormData;
        }) => updateUser(id, data),

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEY,
            });
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEY,
            });
        },
    });
}