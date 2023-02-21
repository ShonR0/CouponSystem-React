import { useNavigate, useParams } from "react-router-dom";
import { deletedCompaniesAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const navigate = useNavigate();

    const cancel = () => {
        navigate("/companies");
    }
    const yes = async () => {
        await webApi.deleteCompany(id)
        .then(res => {
            notify.success("Company deleted successfully");
            store.dispatch(deletedCompaniesAction(id));
            navigate("/companies");
        })
        .catch(err=>{
            console.log(err.response.data.value);
            notify.error(err);
        });
    }
    return (
        <div className="DeleteCompany">
			<h3>Attention</h3>
			<p>Are you sure you want to delete Company #{id} ?</p>
            <div className="row gap">
                <button className="cancel" onClick={cancel}>Cancel</button>
                <button className="yes" onClick={yes}>Yes</button>
            </div>
        </div>
    );
}

export default DeleteCompany;
