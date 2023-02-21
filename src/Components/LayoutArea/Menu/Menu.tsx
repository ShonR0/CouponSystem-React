import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../../Models/Auth";
import store from "../../../Redux/Store";
import Global from "../../../Services/ConstantService";
import "./Menu.css";

function Menu(): JSX.Element {
    const [customer, setCustomer] = useState(store.getState().customerReducer.customer);
    const [company, setCompany] = useState(store.getState().companyReducer.company);
    const [admin, setAdmin] = useState(store.getState().adminReducer.admin);
    
    useEffect(() => {
        return store.subscribe(() => setCompany(store.getState().companyReducer.company));
    },[]);
    useEffect(() => {
        return store.subscribe(() => setCustomer(store.getState().customerReducer.customer));
    },[]);
    useEffect(() => {
        return store.subscribe(() => setAdmin(store.getState().adminReducer.admin));
    },[]);
    return (
        <div className="Menu">
			<Link to="/home">Home</Link>
			<Link to="/about">About</Link>
			<Link to="/donate">donate</Link>
            {company.userType === UserType.COMPANY && <Link to="/coupons">Create Coupon</Link>}
            {company.userType === UserType.COMPANY &&  <Link to="/search">Search Coupons</Link>}
            {company.userType === UserType.CUSTOMER &&  <Link to="/search">Search Coupons</Link>}
            {admin.userType === UserType.ADMIN &&  <Link to="/customers">Customers List</Link>}
            {admin.userType === UserType.ADMIN &&  <Link to="/companies">Companies List</Link>}
        </div>
    );
}

export default Menu;
