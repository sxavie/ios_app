export interface Menu {
    title: string;
    icon: string;
    redirect: string
};

export interface LoginForm {
    email: string;
    password: string;
    source: string,
    firebaseToken: string
};

export interface RegisterForm {
    name: string
    email: string;
    password: string;
    mobile: string,
    userType: string
};