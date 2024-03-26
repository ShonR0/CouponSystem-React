import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// import schema from "yup/lib/schema";
import { CouponModel, CouponPayloadModel } from "../../../Models/Coupon";
import { couponsReducer, removeCoupons, updatedCouponAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import "./PurchaseCoupon.css";

function PurchaseCoupon(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0)
    const navigate = useNavigate();

    const cancel = () => {
        navigate("/search");
    }

    const handleConfirmPurchase = async () => {
        await webApi.purchaseCoupon(id)
        .then(res => {
            notify.success("Coupon purchased successfully");
            navigate("/search");
        })
        .catch(err => {
            console.log(err.response.data.value);
            notify.error(err);
        });
    }

    return (
        <div className="PurchaseCoupon col">
			<p>Are you sure you want to purchase this coupon?</p>
            <button className="addButton" onClick={handleConfirmPurchase}>Yes</button>
            <button className="cancelButton" onClick={cancel}>Cancel</button>
        </div>
    );
}

export default PurchaseCoupon;
