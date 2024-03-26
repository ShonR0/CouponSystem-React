export interface CouponModel {
    id?: number;
    title?: string;
    description?: string;
    amount?: number;
    category?: string; // enum???
    startDate?: Date;
    endDate?: Date;
    image?: string; 
    price?: number;
    company?: string;
}

export interface CouponPayloadModel {
    title?: string;
    description?: string;
    amount?: number;
    category?: string; // enum???
    startDate?: Date;
    endDate?: Date;
    image?: string; 
    price?: number;
    company?: string;
}