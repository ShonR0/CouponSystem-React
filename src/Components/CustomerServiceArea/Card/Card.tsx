import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../../../Models/Auth";
import { CouponModel } from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import "./Card.css";

interface CardProps {
    coupon: CouponModel
}
function Card(props: CardProps): JSX.Element {
	const navigate = useNavigate();
	const [customer, setCustomer] = useState(store.getState().customerReducer.customer);
	useEffect(() => {
        return store.subscribe(() => setCustomer(store.getState().customerReducer.customer));
    },[]);
	const purchaseItem = (id:number) => {
        navigate("/purchase/" + id)
    }
    return (
        <div className="Card">
			{/* <p>{props.coupon.id}</p> */}
			<p>{props.coupon.title}</p>
			<p>{props.coupon.description}</p>
			<p>{props.coupon.startDate.toString()}</p>
            -
			<p>{props.coupon.endDate.toString()}</p>
			<p>{props.coupon.category}</p>
			<p>Price: {props.coupon.price.toFixed(2)}</p>
			<p>Amount: {props.coupon.amount}</p>
			<img src={props.coupon.image} alt="couponImg" />
			{customer.userType === UserType.CUSTOMER && <button className="addButton" onClick={() => purchaseItem(props.coupon.id)}>Buy Coupon</button>}
			{/* <button onClick={() => purchaseItem(props.coupon.id)}>Buy Coupon</button> */}
        </div>
    );
}

export default Card;
