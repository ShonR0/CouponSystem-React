import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import { gotAllCouponsAction, removeCoupons } from "../../../Redux/CouponsAppState";
import "./CouponList.css";
import CouponItem from "../CouponItem/CouponItem";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { useNavigate } from "react-router-dom";

function CouponList(): JSX.Element {
    const navigate = useNavigate();
    const[coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsReducer.coupons);
    useEffect(() => {
        const token = store.getState().companyReducer.company.token;
        if (!token) {
            navigate("/login");
        } else if (coupons.length === 0) {
            webApi.getAllCompanyCoupons()
            .then(res => {
                console.log(res.data);
                setCoupons(res.data);
                store.dispatch(gotAllCouponsAction(res.data));
                notify.success("you got all coupons")
            })
            .catch(err => notify.error(err));
        }
        },[]);
    return (
        <div className="CouponList col ">
            <h1>Coupon Management</h1>
            <button className="addButton" onClick={() => navigate("add")}>Add new Coupon</button>
            {
                coupons.length > 0
                ? <>{coupons.map((c, idx)=><CouponItem key={"c" + idx} coupon={c}/>)}</>
                :<EmptyView msg="No coupon found" /> 
            }
        </div>
    );
}

export default CouponList;
