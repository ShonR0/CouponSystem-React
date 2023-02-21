import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import "./CompanyItem.css";

interface CompanyItemProps {
    company: CompanyModel;
}

function CompanyItem(props: CompanyItemProps): JSX.Element {
    const navigate = useNavigate();
    
    const deleteCompany = (id:number) => {
        navigate("/companies/delete/" + id)
    }
    return (
        <div className="CompanyItem card">
			<h3>{props.company.name}</h3>
            <span>{props.company.email}</span>
            <button className="cancelButton" onClick={() => deleteCompany(props.company.id)}>
                Delete
            </button>
        </div>
    );
}

export default CompanyItem;
