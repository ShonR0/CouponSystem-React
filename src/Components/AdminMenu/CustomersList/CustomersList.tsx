import "./CustomersList.css";
import { CustomerModel } from "../../../Models/Customer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import webApi from "../../../Services/WebApi";
import { gotAllCustomersAction } from "../../../Redux/CustomerAppState";
import notify from "../../../Services/NotificationService";
import CustomerItem from "../CustomerItem/CustomerItem";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { Customer, UserType } from "../../../Models/Auth";

function CustomersList(): JSX.Element {
    const navigate = useNavigate();
    const[customers, setCustomers] = useState<CustomerModel[]>(store.getState().customerReducer.getCustomer);

    useEffect(() => {
        const token = store.getState().adminReducer.admin.token;
        if (!token) {
            navigate("/login");
        } else if (customers.length === 0) {
            webApi.getAllCustomers()
            .then(res => {
                setCustomers(res.data);
                notify.success("you got all customers!");
            })
            .catch(err => notify.error(err));
        }
        },[]);
    return (
        <div className="CustomersList col">
            {
                customers.length > 0
                ? <>{customers.map((c, idx)=><CustomerItem key={"c" + idx} customer={c}/>)}</>
                :<EmptyView msg="No customers found" /> 
            }
        </div>
    );
}

export default CustomersList;
