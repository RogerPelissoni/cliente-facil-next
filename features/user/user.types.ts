export type UserStatus =
    | "ACTIVE"
    | "INACTIVE";

export interface User {
    id: number;
    name: string;
    email: string;
    status: UserStatus;
    companyId: number;
    birthDate: Date;
    lastAccess: Date;
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