import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import webApi from "../../../Services/WebApi";
import Card from "../Card/Card";
import "./CompanyCoupons.css";

function CompanyCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [query, setQuery] = useState('');

    const filteredData = coupons.filter((coupon) =>
        coupon.title.toLowerCase().includes(query.toLowerCase())
    );
    useEffect(() => {
        webApi.getAllCompanyCoupons()
        .then(res => setCoupons(res.data))
        .catch(err => console.log(err));
    },[]);
    return (
        <div className="CompanyCoupons col">
			<h1>Company's list: </h1>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            {
                filteredData.map(coupon => 
                    <Card key={coupon.id} coupon={coupon}/>)
            }
        </div>
    );
}

export default CompanyCoupons;
