import "./Register.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterModel } from "../../../Models/Auth";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        firstName:
            yup.string()
                .min(2, "First Name must be at least 2 characters")
                .required("First Name is required"),
        lastName:
            yup.string()
                .min(2, "First Name must be at least 2 characters")
                .required("Last Name is required"),   
        email:
            yup.string()
                .email("Invalid email address")
                .required("Email is required"),
        password:
            yup.string()
                .min(4, "password must be at least 4 characters")
                .required("Password is required"),
        confirm:
            yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must be match')
                .required("Confirm is required"),
    });
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) });

    const postRegister = async (obj: RegisterModel) => {
        const credentials = {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email:obj.email, 
            password:obj.password
        };
        await webApi.register(credentials).then(res => {
            notify.success('Register successfully')
            navigate("/login")
        }).catch(err => notify.error(err));
    }    
    return (
        <div className="Register col">
			<h2>Register as Customer</h2>
            <form className="form" onSubmit={handleSubmit(postRegister)}>
                {(!errors.firstName) ? <label htmlFor="firstName">First Name</label> : <span>{errors.firstName.message}</span>}
                <input {...register("firstName")} id="firstName" type="firstName" placeholder="First Name"/>
                {(!errors.lastName) ? <label htmlFor="lastName">Last Name</label> : <span>{errors.lastName.message}</span>}
                <input {...register("lastName")} id="lastName" type="lastName" placeholder="Last Name"/>
                {(!errors.email) ? <label htmlFor="email">Email</label> : <span>{errors.email.message}</span>}
                <input {...register("email")} id="email" type="email" placeholder="Email"/>
                {(!errors.password) ? <label htmlFor="password">Password</label> : <span>{errors.password.message}</span>}
                <input {...register("password")} id="password" type="password" placeholder="Password"/>
                {(!errors.confirm) ? <label htmlFor="confirm">Confirm</label> : <span>{errors.confirm.message}</span>}
                <input {...register("confirm")} id="confirm" type="confirm" placeholder="Confirm Password"/>
                <button className="addButton" disabled={!isValid}>Register</button> 
            </form>
        </div>
    );
}

export default Register;
