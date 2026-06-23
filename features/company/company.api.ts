import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { companiesMock } from "./company.mock";

import {
    Company,
    CompanyFilters,
} from "./company.types";

import { Sorting } from "@/shared/types/table.types";
import { PageResponse } from "../user/user.types";
import { CompanyFormData } from "./company.schema";


export const companyKeys = {
    all: ["companies"] as const,

    detail: (id: number) =>
        ["companies", id] as const,
};

let companies = [...companiesMock];

async function delay(
    ms = 300,
) {
    return new Promise((resolve) =>
        setTimeout(resolve, ms),
    );
}

export async function getCompanies(
    filters: CompanyFilters,
    page: number,
    size: number,
    sorting: Sorting,
): Promise<PageResponse<Company>> {
    await delay();

    const filtered =
        companies.filter((company) =>
            company.tradeName
                .toLowerCase()
                .includes(
                    filters.tradeName.toLowerCase(),
                ),
        );

    filtered.sort((a, b) => {
        const valueA =
            a[
            sorting.field as keyof Company
            ];

        const valueB =
            b[
            sorting.field as keyof Company
            ];

        if (valueA < valueB) {
            return sorting.direction ===
                "asc"
                ? -1
                : 1;
        }

        if (valueA > valueB) {
            return sorting.direction ===
                "asc"
                ? 1
                : -1;
        }

        return 0;
    });

    const start =
        page * size;

    const end =
        start + size;

    return {
        content: filtered.slice(
            start,
            end,
        ),

        page,

        size,

        totalElements:
            filtered.length,

        totalPages: Math.ceil(
            filtered.length / size,
        ),
    };
}

export async function createCompany(
    data: CompanyFormData,
) {
    await delay();

    const company: Company = {
        id:
            Math.max(
                ...companies.map(
                    (c) => c.id,
                ),
                0,
            ) + 1,

        ...data,
    };

    companies.push(company);

    return company;
}

export async function updateCompany(
    id: number,
    data: CompanyFormData,
) {
    await delay();

    const index =
        companies.findIndex(
            (c) => c.id === id,
        );

    if (index === -1) {
        throw new Error(
            "Empresa não encontrada",
        );
    }

    companies[index] = {
        ...companies[index],
        ...data,
    };

    return companies[index];
}

export async function deleteCompany(
    id: number,
) {
    await delay();

    companies = companies.filter(
        (company) =>
            company.id !== id,
    );
}

export function useCompanies(
    filters: CompanyFilters,
    page: number,
    size: number,
    sorting: Sorting,
) {
    return useQuery({
        queryKey: [
            ...companyKeys.all,
            filters,
            page,
            size,
            sorting,
        ],

        queryFn: () =>
            getCompanies(
                filters,
                page,
                size,
                sorting,
            ),
    });
}

export function useCompaniesSelect() {
    return useQuery({
        queryKey: [
            ...companyKeys.all,
            "select",
        ],

        queryFn: async () => {
            await delay();

            return companies;
        },
    });
}

export function useCreateCompany() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn:
            createCompany,

        onSuccess() {
            toast.success(
                "Empresa criada com sucesso",
            );

            queryClient.invalidateQueries({
                queryKey:
                    companyKeys.all,
            });
        },
    });
}

export function useUpdateCompany() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: CompanyFormData;
        }) =>
            updateCompany(id, data),

        onSuccess() {
            toast.success(
                "Empresa atualizada com sucesso",
            );

            queryClient.invalidateQueries({
                queryKey:
                    companyKeys.all,
            });
        },
    });
}

export function useDeleteCompany() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn:
            deleteCompany,

        onSuccess() {
            toast.success(
                "Empresa removida com sucesso",
            );

            queryClient.invalidateQueries({
                queryKey:
                    companyKeys.all,
            });
        },
    });
}
