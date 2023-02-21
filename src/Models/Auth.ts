import ShowCoupon from "../Components/CustomerServiceArea/ShowCoupon/ShowCoupon";

export interface LoginModel {
    email: string;
    password: string;
}

export interface RegisterModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm: boolean;
}

export interface RegisterCompanyModel {
    name: string;
    email: string;
    password: string;
    confirm: boolean;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface Admin {
    token: string;
    email: string;
    userType: UserType;
}

export interface Customer {
    token: string;
    email: string;
    userType: UserType;
}

export interface Company {
    token: string;
    email: string;
    userType: UserType;
}

export enum UserType {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    COMPANY = "COMPANY" 
}