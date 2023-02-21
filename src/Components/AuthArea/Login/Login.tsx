import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.css";
import { useForm } from "react-hook-form";
import { LoginModel, UserType } from "../../../Models/Auth";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { loggedIn } from "../../../Redux/CustomerAppState";
import { useState } from "react";
import { CouponModel } from "../../../Models/Coupon";

function Login(): JSX.Element {

    const navigate = useNavigate();

    const [company, setCompany] = useState(store.getState().companyReducer.company);

    const schema = yup.object().shape({
        email:
            yup.string()
                .email("Invalid email address")
                .required("Email is required"),
        password:
            yup.string()
                .min(4, "password must be at least 4 characters")
                .required("Password is required")
    });
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

    const postLogin = async (obj: LoginModel) => {
        const credentials = { 
            email:obj.email, 
            password:obj.password 
        };
        await webApi.login(credentials).then(res => {
            notify.success("Login successful");
            console.log(res.data);
            // Update global state
            store.dispatch(loggedIn(res.data));
            navigate("/home");
        }).catch(err => notify.error(err));
    }
    return (
        <div className="Login">
			<h2>Login</h2>
            <form onSubmit={handleSubmit(postLogin)}>
                {(!errors.email) ? <label htmlFor="email">Email</label> : <span>{errors.email.message}</span>}
                <input {...register("email")} type="email" placeholder="email"/>
                {(!errors.password) ? <label htmlFor="password">Password</label> : <span>{errors.password.message}</span>}
                <input {...register("password")} type="password" placeholder="password"/>
                <button className="addButton" disabled={!isValid}>Login</button>
            </form>
        </div>
    );
}

export default Login;
