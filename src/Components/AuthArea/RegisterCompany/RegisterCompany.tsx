import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./RegisterCompany.css";
import { RegisterCompanyModel, RegisterModel } from "../../../Models/Auth";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";

function RegisterCompany(): JSX.Element {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        name:
            yup.string()
                .min(2, "Company Name must be at least 2 characters")
                .required("Company Name is required"),
        email:
            yup.string()
                .email("Invalid email address")
                .required("Company Email is required"),
        password:
            yup.string()
                .min(4, "password must be at least 4 characters")
                .required("Password is required"),
        confirm:
            yup.string()
            .oneOf([yup.ref('password')], 'Passwords must be match')
                .required("Confirm is required"),
    });
        const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<RegisterCompanyModel>({ mode: "all", resolver: yupResolver(schema) });
    
    const postRegister = async (obj: RegisterCompanyModel) => {
        const credentials = {
            name: obj.name,
            email:obj.email, 
            password:obj.password
        };
        await webApi.registerCompany(credentials).then(res => {
            notify.success('Register successfully')
            navigate("/login")
        }).catch(err => notify.error(err));
    }
    return (
        <div className="RegisterCompany">
			<h2>Register as Company</h2>
            <form className="form" onSubmit={handleSubmit(postRegister)}>
                {(!errors.name) ? <label htmlFor="name">Company Name</label> : <span>{errors.name.message}</span>}
                <input {...register("name")} id="name" type="name" placeholder="Company Name"/>
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

export default RegisterCompany;
