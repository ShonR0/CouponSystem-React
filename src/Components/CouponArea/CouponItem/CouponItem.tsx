import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";
import "./CouponItem.css";

interface CouponItemProps {
    coupon: CouponModel;
}
function CouponItem(props: CouponItemProps): JSX.Element {
    const navigate = useNavigate();
    
    const deleteItem = (id:number) => {
        navigate("/coupons/delete/" + id)
    }
    const editItem = (id:number) => {
        navigate("/coupons/edit/" + id)
    }

    return (
        <div className="CouponItem card">
			<h3>{props.coupon.title}</h3>
            <span>{props.coupon.description}</span>
            <span>Start Date: {moment(props.coupon.startDate).format("DD/MM/YY")}</span>
            <span>End Date: {moment(props.coupon.endDate).format("DD/MM/YY")}</span>
            <span>Amount: {props.coupon.amount}</span>
            <span>Price: {props.coupon.price}$</span>
            <img className="couponImg" src={props.coupon.image} alt="couponImg" />
            <div className="row">
                <button className="cancelButton" onClick={() => deleteItem(props.coupon.id)}>
                    Delete
                </button>
                <button className="editButton" onClick={() => editItem(props.coupon.id)}>
                    Edit
                </button>
            </div>
        </div>
    );
}

export default CouponItem;
