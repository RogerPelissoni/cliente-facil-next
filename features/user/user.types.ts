export interface User {
    id: number;
    name: string;
    email: string;
}

export interface UserFormData {
    name: string;
    email: string;
}

export interface UserFilters {
    name: string;
    email: string;
}

export interface UserSorting {
    field: string;
    direction: "asc" | "desc";
}

export interface PageResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}