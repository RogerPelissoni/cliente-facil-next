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

export interface PageResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}