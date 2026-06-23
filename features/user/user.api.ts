import { Sorting } from "@/shared/types/table.types";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
    PageResponse,
    User,
    UserFilters,
    UserFormData,
} from "./user.types";

export const userKeys = {
    all: ["users"] as const,

    detail: (id: number) =>
        ["users", id] as const,
};

async function delay(ms = 500) {
    return new Promise((resolve) =>
        setTimeout(resolve, ms),
    );
}

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
        name: "João Silva",
        email: "joao@email.com",
    },
    {
        id: 4,
        name: "Maria Souza",
        email: "maria@email.com",
    },
    {
        id: 5,
        name: "Carlos Santos",
        email: "carlos@email.com",
    },
    {
        id: 6,
        name: "Ana Oliveira",
        email: "ana@email.com",
    },
    {
        id: 7,
        name: "Pedro Lima",
        email: "pedro@email.com",
    },
];

export async function getUsers(
    filters: UserFilters,
    page: number,
    size: number,
    sorting: Sorting,
): Promise<PageResponse<User>> {
    await delay(300);

    const filtered = users.filter((user) => {
        const matchName =
            !filters.name ||
            user.name
                .toLowerCase()
                .includes(
                    filters.name.toLowerCase(),
                );

        const matchEmail =
            !filters.email ||
            user.email
                .toLowerCase()
                .includes(
                    filters.email.toLowerCase(),
                );

        return (
            matchName &&
            matchEmail
        );
    });

    filtered.sort((a, b) => {
        const valueA = a[sorting.field as keyof User];
        const valueB = b[sorting.field as keyof User];

        if (valueA < valueB) return sorting.direction === "asc" ? -1 : 1;
        if (valueA > valueB) return sorting.direction === "asc" ? 1 : -1;
        return 0;
    });

    const start = page * size;
    const end = start + size;

    return {
        content: filtered.slice(start, end,),
        page,
        size,
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / size,),
    };
}

export async function getUser(
    id: number,
): Promise<
    User | undefined
> {
    await delay();

    return users.find(
        (user) => user.id === id,
    );
}

export async function createUser(
    data: UserFormData,
): Promise<User> {
    await delay();

    const user: User = {
        id:
            Math.max(
                ...users.map(
                    (user) => user.id,
                ),
                0,
            ) + 1,

        ...data,
    };

    users.push(user);

    return user;
}

export async function updateUser(
    id: number,
    data: UserFormData,
): Promise<User> {
    await delay();

    const index =
        users.findIndex(
            (user) => user.id === id,
        );

    if (index === -1) {
        throw new Error(
            "Usuário não encontrado",
        );
    }

    users[index] = {
        ...users[index],
        ...data,
    };

    return users[index];
}

export async function deleteUser(
    id: number,
): Promise<void> {
    await delay();

    users = users.filter(
        (user) => user.id !== id,
    );
}

export function useUsers(
    filters: UserFilters,
    page: number,
    size: number,
    sorting: Sorting,
) {
    return useQuery({
        queryKey: [
            ...userKeys.all,
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

export function useUser(
    id: number,
) {
    return useQuery({
        queryKey:
            userKeys.detail(id),

        queryFn: () =>
            getUser(id),

        enabled: !!id,
    });
}

export function useCreateUser() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: createUser,

        onSuccess() {
            toast.success(
                "Usuário criado com sucesso",
            );

            queryClient.invalidateQueries({
                queryKey:
                    userKeys.all,
            });
        },

        onError() {
            toast.error(
                "Erro ao criar usuário",
            );
        },
    });
}

export function useUpdateUser() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: UserFormData;
        }) =>
            updateUser(id, data),

        onSuccess() {
            toast.success(
                "Usuário atualizado com sucesso",
            );

            queryClient.invalidateQueries({
                queryKey:
                    userKeys.all,
            });
        },

        onError() {
            toast.error(
                "Erro ao atualizar usuário",
            );
        },
    });
}

export function useDeleteUser() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: deleteUser,

        onSuccess() {
            toast.success(
                "Usuário removido com sucesso",
            );

            queryClient.invalidateQueries({
                queryKey:
                    userKeys.all,
            });
        },

        onError() {
            toast.error(
                "Erro ao remover usuário",
            );
        },
    });
}