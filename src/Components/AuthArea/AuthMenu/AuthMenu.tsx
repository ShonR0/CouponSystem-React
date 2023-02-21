import { useEffect, useState } from "react";
import { Customer, RegisterModel } from "../../../Models/Auth";
import store from "../../../Redux/Store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const [customer,setCustomer] = useState<Customer>(store.getState().customerReducer.customer);

    useEffect(() => {
        return store.subscribe(() => setCustomer(store.getState().customerReducer.customer))
    },[]);
    return (
        <div className="AuthMenu row">
			{(customer?.token) ? 
                <>Connected as {customer.email} &nbsp;<CustomLink to="logout">Logout</CustomLink></> :
                <>Hello guest &nbsp;<CustomLink to="registerAs">Register</CustomLink>&nbsp; <CustomLink to="login">Login</CustomLink></>}
        </div>
    );
}

export default AuthMenu;
