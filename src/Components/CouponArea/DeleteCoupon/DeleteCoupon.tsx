import { useNavigate, useParams } from "react-router-dom";
import { deletedCouponAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const navigate = useNavigate();

    const cancel = () => {
        navigate("/coupons");
    }
    const yes = async () => {
        await webApi.deleteCoupon(id)
        .then(res => {
            notify.success("Woho deleted successfully");
            store.dispatch(deletedCouponAction(id));
            navigate("/coupons");
        })
        .catch(err=>{
            console.log(err.response.data.value);
            notify.error(err);
        });
    }
    return (
        <div className="DeleteCoupon">
			<h3>Attention</h3>
			<p>Are you sure you want to delete Coupon #{id} ?</p>
            <div className="row gap">
                <button className="cancel" onClick={cancel}>Cancel</button>
                <button className="yes" onClick={yes}>Yes</button>
            </div>
        </div>
    );
}

export default DeleteCoupon;
