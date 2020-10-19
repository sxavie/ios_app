export interface Menu {
    title: string;
    icon: string;
    redirect: string;
};

export interface LoginForm {
    email: string;
    password: string;
    source: string;
    firebaseToken: string;
};

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    mobile: string;
    userType: string;
};

export interface UpdateForm {
    name: string;
    gender: string;
    weight: string;
    height: string;
    mobile: string;
    birthday: string;
    email: string;
    userType: string;
}

export interface Diseases {
    diabetes: boolean;
    hypertension: boolean;
    heartDisease: boolean;
    epilepsy: boolean;
    prevSurgeries: boolean;
}

export interface Card {
    number: string;
    month: string;
    year: string;
    cvc: string;
    user: string;
}