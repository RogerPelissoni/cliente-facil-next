import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageResponse, User, UserFilters, UserFormData, UserSorting } from "./user.types";

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
    {
        id: 3,
        name: "Administrador",
        email: "admin@email.com",
    },
    {
        id: 4,
        name: "Administrador",
        email: "admin@email.com",
    },
    {
        id: 5,
        name: "Administrador",
        email: "admin@email.com",
    },
    {
        id: 6,
        name: "Administrador",
        email: "admin@email.com",
    },
    {
        id: 7,
        name: "Administrador",
        email: "admin@email.com",
    },
];

export async function getUsers(
    filters: UserFilters,
    page: number,
    size: number,
    sorting: UserSorting,
): Promise<PageResponse<User>> {
    await new Promise((resolve) =>
        setTimeout(resolve, 300),
    );

    const filtered = users.filter((user) => {
        const matchName =
            !filters.name ||
            user.name
                .toLowerCase()
                .includes(filters.name.toLowerCase());

        const matchEmail =
            !filters.email ||
            user.email
                .toLowerCase()
                .includes(filters.email.toLowerCase());

        return matchName && matchEmail;
    });

    filtered.sort((a, b) => {
        const valueA =
            a[
            sorting.field as keyof User
            ];

        const valueB =
            b[
            sorting.field as keyof User
            ];

        if (valueA < valueB) {
            return sorting.direction === "asc"
                ? -1
                : 1;
        }

        if (valueA > valueB) {
            return sorting.direction === "asc"
                ? 1
                : -1;
        }

        return 0;
    });

    const start = page * size;

    const end = start + size;

    return {
        content: filtered.slice(start, end),
        page,
        size,
        totalElements: filtered.length,
        totalPages: Math.ceil(
            filtered.length / size,
        ),
    };
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
    filters: UserFilters,
    page: number,
    size: number,
    sorting: UserSorting,
) {
    return useQuery({
        queryKey: [
            "users",
            filters,
            page,
            size,
            sorting,
        ],

        queryFn: () =>
            getUsers(
                filters,
                page,
                size,
                sorting,
            ),
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