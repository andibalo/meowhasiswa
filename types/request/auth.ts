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

export interface ISendResetPasswordCodeRequest {
    email: string;
}

export interface IVerifyResetPasswordCodeRequest {
    email: string;
    code: string;
}

export interface IResetPasswordRequest {
    email: string;
    password: string;
}
