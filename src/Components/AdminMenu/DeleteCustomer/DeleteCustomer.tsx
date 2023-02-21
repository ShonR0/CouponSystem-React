import { useNavigate, useParams } from "react-router-dom";
import { deletedCustomerAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const navigate = useNavigate();

    const cancel = () => {
        navigate("/customers");
    }
    const yes = async () => {
        await webApi.deleteCustomer(id)
        .then(res => {
            notify.success("Customer deleted successfully");
            store.dispatch(deletedCustomerAction(id));
            navigate("/customers");
        })
        .catch(err=>{
            console.log(err.response.data.value);
            notify.error(err);
        });
    }
    return (
        <div className="DeleteCustomer">
			<h3>Attention</h3>
			<p>Are you sure you want to delete Customer #{id} ?</p>
            <div className="row gap">
                <button className="cancel" onClick={cancel}>Cancel</button>
                <button className="yes" onClick={yes}>Yes</button>
            </div>
        </div>
    );
}

export default DeleteCustomer;
