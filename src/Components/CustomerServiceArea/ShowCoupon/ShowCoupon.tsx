import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import webApi from "../../../Services/WebApi";
import Card from "../Card/Card";
import "./ShowCoupon.css";


function ShowCoupon(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [query, setQuery] = useState('');

    const filteredData = coupons.filter((coupon) =>
        coupon.title.toLowerCase().includes(query.toLowerCase())
    );
    useEffect(() => {
        webApi.getAllCoupons()
        .then(res => setCoupons(res.data))
        .catch(err => console.log(err));
    },[]);
    return (
        <div className="ShowCoupon">
            <div className="list col">
                <h1>Coupon list: </h1>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            {
                filteredData.map(coupon => 
                    <Card key={coupon.id} coupon={coupon}/>)
            }
            </div>
        </div>
    );
}

export default ShowCoupon;
