import "./Logo.css";
import logo from "../Images/couponLogo.png"

function Logo(): JSX.Element {
    return (
        <div className="Logo row">
            <img src={logo} alt="Couponosh" />
			<h1>Couponosh</h1>
        </div>
    );
}

export default Logo;
