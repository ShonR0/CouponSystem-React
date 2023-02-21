import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import CompaniesList from "../../AdminMenu/CompaniesList/CompaniesList";
import CustomersList from "../../AdminMenu/CustomersList/CustomersList";
import DeleteCompany from "../../AdminMenu/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../AdminMenu/DeleteCustomer/DeleteCustomer";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import RegisterAs from "../../AuthArea/RegisterAs/RegisterAs";
import RegisterCompany from "../../AuthArea/RegisterCompany/RegisterCompany";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import CouponList from "../../CouponArea/CouponList/CouponList";
import DeleteCoupon from "../../CouponArea/DeleteCoupon/DeleteCoupon";
import EditCoupon from "../../CouponArea/EditCoupon/EditCoupon";
import PurchaseCoupon from "../../CustomerServiceArea/PurchaseCoupon/PurchaseCoupon";
import ShowCoupon from "../../CustomerServiceArea/ShowCoupon/ShowCoupon";
import Home from "../../LayoutArea/Home/Home";
import About from "../../PagesArea/About/About";
import Donate from "../../PagesArea/Donate/Donate";
import Page404 from "../../PagesArea/Page404/Page404";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App/>} />
                <Route index element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/donate" element={<Donate/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/registerCompany" element={<RegisterCompany/>} />
                <Route path="/registerAs" element={<RegisterAs/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/coupons" element={<CouponList/>} />
                <Route path="/coupons/add" element={<AddCoupon/>} />
                <Route path="/coupons/delete/:id" element={<DeleteCoupon/>} />
                <Route path="/coupons/edit/:id" element={<EditCoupon/>} />
                <Route path="/search" element={<ShowCoupon/>} />
                <Route path="/purchase/:id" element={<PurchaseCoupon/>} />
                <Route path="/customers" element={<CustomersList/>} />
                <Route path="/customers/delete/:id" element={<DeleteCustomer/>} />
                <Route path="/companies" element={<CompaniesList/>} />
                <Route path="/companies/delete/:id" element={<DeleteCompany/>} />
                <Route path="/*" element={<Page404/>} />
            </Routes>
        </div>
    );
}

export default Routing;
