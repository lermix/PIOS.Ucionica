export interface VerifiedUser {
    username: string | undefined;
    roles: string | undefined;
    token: string | undefined;
    id: number;
}

export class VerifiedUserClass implements VerifiedUser {
    username = undefined;
    roles = undefined;
    token = undefined;
    id = -2;
}

export interface LoginDto {
    username: string;
    password: string;
}
