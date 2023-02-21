export interface CompanyModel {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface CompanyPayloadModel {
    name: string;
    email: string;
    password: string;
}