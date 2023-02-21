import "./CustomerItem.css";
import { CustomerModel } from "../../../Models/Customer";
import { useNavigate } from "react-router-dom";

interface CustomerItemProps {
    customer: CustomerModel;
}

function CustomerItem(props: CustomerItemProps): JSX.Element {
    const navigate = useNavigate();
    
    const deleteCustomer = (id:number) => {
        navigate("/customers/delete/" + id)
    }
    return (
        <div className="CustomerItem card">
			<h3>{props.customer.firstName + " " + props.customer.lastName}</h3>
            <span>{props.customer.email}</span>
            <button className="cancelButton" onClick={() => deleteCustomer(props.customer.id)}>
                Delete
            </button>
        </div>
    );
}

export default CustomerItem;
