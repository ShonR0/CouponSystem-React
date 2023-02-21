import { Link } from "react-router-dom";
import "./RegisterAs.css";

function RegisterAs(): JSX.Element {
    return (
        <div className="RegisterAs row">
			<p className="card">
                Register as Customer <Link className="addButton" to="/register">Customer</Link>
            </p>
			<p className="card">
                Register as Company <Link className="addButton" to="/registerCompany">Company</Link>
            </p>
        </div>
    );
}

export default RegisterAs;
