import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../Models/Auth";
import { CouponModel } from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import CompanyCoupons from "../../CustomerServiceArea/CompanyCoupons/CompanyCoupons";
import CustomerCoupons from "../../CustomerServiceArea/CustomerCoupons/CustomerCoupons";
import ShowCoupon from "../../CustomerServiceArea/ShowCoupon/ShowCoupon";
import "./Home.css";

function Home(): JSX.Element {
    const [customer, setCustomer] = useState(store.getState().customerReducer.customer);
    const [company, setCompany] = useState(store.getState().companyReducer.company);
        
    useEffect(() => {
        return store.subscribe(() => setCompany(store.getState().companyReducer.company));
    },[]);
    useEffect(() => {
        return store.subscribe(() => setCustomer(store.getState().customerReducer.customer));
    },[]);
    return (
        <div className="Home">
			{company.userType === UserType.COMPANY && <CompanyCoupons/>}
			{customer.userType === UserType.CUSTOMER && <CustomerCoupons/>}
        </div>
    );
}

export default Home;
