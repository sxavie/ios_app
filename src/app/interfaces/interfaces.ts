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