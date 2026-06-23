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