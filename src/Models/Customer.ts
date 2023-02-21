export interface CustomerModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface CustomerPayloadModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}