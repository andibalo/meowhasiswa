export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface IRegisterUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface IVerifyEmailRequest {
    email: string;
    code: string;
}
