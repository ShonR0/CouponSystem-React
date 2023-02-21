import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import webApi from "../../../Services/WebApi";
import Card from "../Card/Card";
import "./CustomerCoupons.css";

function CustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [query, setQuery] = useState('');

    const filteredData = coupons.filter((coupon) =>
        coupon.title.toLowerCase().includes(query.toLowerCase())
    );
    useEffect(() => {
        webApi.getAllPurchasedCoupons()
        .then(res => setCoupons(res.data))
        .catch(err => console.log(err));
    },[]);
    return (
        <div className="CustomerCoupons col">
			<h1>Purchased Coupons: </h1>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            {
                filteredData.map(coupon => 
                    <Card key={coupon.id} coupon={coupon}/>)
            }
        </div>
    );
}

export default CustomerCoupons;
