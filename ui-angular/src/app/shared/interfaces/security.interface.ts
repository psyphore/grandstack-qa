export interface SignInCredentials {
    creds: {
        identifier: string;
        password: string;
        provider: string;
    };
}

export interface SignIn {
    login: {
        jwt: string;
    };
}

export interface Me {
    me: {
        id: any;
        username: string;
        email: string;
        confirmed: boolean;
        blocked: boolean;
        role: {
            id: string;
            name: string;
        };
    };
}