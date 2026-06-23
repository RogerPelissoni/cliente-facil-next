export interface User {
    id: number;
    name: string;
    email: string;
}

export type UserFormData = Omit<User, "id">;