export type UserStatus =
    | "ACTIVE"
    | "INACTIVE";

export interface User {
    id: number;
    name: string;
    email: string;
    status: UserStatus;
}

export interface UserFormData {
    name: string;
    email: string;
    status: UserStatus;
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