import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Credentials, Customer } from "../Models/Auth";
import { CouponModel, CouponPayloadModel } from "../Models/Coupon";
import { CompanyModel, CompanyPayloadModel } from "../Models/Company";
import store from "../Redux/Store";
import Global from "./ConstantService";
import { removeCoupons } from "../Redux/CouponsAppState";
import { CustomerModel } from "../Models/Customer";

class WebApi {

    
    private couponApi = Global.urls.coupons;
    private companyApi = Global.urls.companies;
    private authApi = Global.urls.auth;
    private customerApi = Global.urls.customers;
    private adminApi = Global.urls.admin;

    public register(credentials: Credentials): Promise<AxiosResponse<any>> {
        return axios.post<any>(this.authApi + "/" + "customer/register", credentials);
    } 
    
    public registerCompany(credentials: Credentials): Promise<AxiosResponse<any>> {
        return axios.post<any>(this.authApi + "/" + "company/register", credentials);
    }

    public login(credentials: Credentials): Promise<AxiosResponse<Customer>> {
        return axios.post<Customer>(this.authApi + "/" + "login", credentials);
    }

    public getAllCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
        const token = store.getState().customerReducer.customer.token;
        const headers = {"Authorization": token}
        const options = {headers};
        return axios.get<any>(this.adminApi + "/customers", options);
    }
    
    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        const token = store.getState().customerReducer.customer.token;
        const headers = {"Authorization": token}
        const options = {headers};
        return axios.get<any>(this.adminApi + "/companies", options);
    }

    public deleteCustomer(id: number): Promise<AxiosResponse<any>> {
        const token = store.getState().companyReducer.company.token;
        const headers = {"Authorization": token}
        const options = {headers};
        return axios.delete<any>(this.adminApi + "/customers/" + id, options);
    }
    
    public deleteCompany(id: number): Promise<AxiosResponse<any>> {
        const token = store.getState().companyReducer.company.token;
        const headers = {"Authorization": token}
        const options = {headers};
        return axios.delete<any>(this.adminApi + "/companies/" + id, options);
    }

    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        // const token = store.getState().customerReducer.customer.token;
        // const headers = {"Authorization": token}
        // const options = {headers};
        return axios.get<any>(this.couponApi);
    }

    public getAllCompanyCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        store.dispatch(removeCoupons())
        const token = store.getState().companyReducer.company.token;
        const headers = {"Authorization": token}
        const options = {headers};
        return axios.get<any>(this.companyApi + "/coupons", options);
    }

    public addCoupon(coupon: CouponPayloadModel):Promise<AxiosResponse<CouponModel>> {
        const token = store.getState().companyReducer.company.token;
        const headers = {"Authorization": token}
        // const options = {headers};
        // return axios.post<CouponModel>(this.companyApi, coupon, {headers});
        return axios.post<CouponModel>(this.couponApi, coupon, {headers});
    }
    
    public deleteCoupon(id: number): Promise<AxiosResponse<any>> {
        const token = store.getState().companyReducer.company.token;
        const headers = {"Authorization": token}
        const options = {headers};
        return axios.delete<any>(this.companyApi + "/coupons/" + id, options);
    }

    public editCoupon(id: number, coupon: CouponPayloadModel):Promise<AxiosResponse<CouponModel>> {
        const token = store.getState().companyReducer.company.token;
        const headers = {"Authorization": token}
        const options = {headers};
        return axios.put<CouponModel>(this.couponApi + "/" + id, coupon, options);
    }

    public purchaseCoupon(id: number): Promise<AxiosResponse<any>> {
        const token = store.getState().customerReducer.customer.token;
        const headers = {"Authorization": token}
        const options = {headers};
        return axios.put<any>(this.customerApi + "/coupons/" + id, null, options);
    }

    public getAllPurchasedCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        const token = store.getState().customerReducer.customer.token;
        const headers = {"Authorization": token}
        const options = {headers};
        return axios.get<any>(this.customerApi + "/purchasedCoupons", options);
    }

}

const webApi = new WebApi();

export default webApi;