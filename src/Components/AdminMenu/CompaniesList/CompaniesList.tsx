import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import { CustomerModel } from "../../../Models/Customer";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CompanyItem from "../CompanyItem/CompanyItem";
import "./CompaniesList.css";

function CompaniesList(): JSX.Element {
    const navigate = useNavigate();
    const[customers, setCustomers] = useState<CompanyModel[]>(store.getState().companyReducer.getCompany);

    useEffect(() => {
        const token = store.getState().adminReducer.admin.token;
        if (!token) {
            navigate("/login");
        } else if (customers.length === 0) {
            webApi.getAllCompanies()
            .then(res => {
                setCustomers(res.data);
                notify.success("you got all companies!");
            })
            .catch(err => notify.error(err));
        }
        },[]);
    return (
        <div className="CompaniesList col">
			{
                customers.length > 0
                ? <>{customers.map((c, idx)=><CompanyItem key={"c" + idx} company={c}/>)}</>
                :<EmptyView msg="No companies found" /> 
            }
        </div>
    );
}

export default CompaniesList;
