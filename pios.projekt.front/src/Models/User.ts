export interface VerifiedUser {
    username: string | undefined;
    roles: string | undefined;
    token: string | undefined;
}

export class VerifiedUserClass implements VerifiedUser {
    username = undefined;
    roles = undefined;
    token = undefined;
}

export interface LoginDto {
    username: string;
    password: string;
}
