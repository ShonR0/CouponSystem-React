import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./AddCoupon.css";
import { CouponPayloadModel } from "../../../Models/Coupon";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import { addedCouponAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        title:
            yup.string()
                .required("Title is required"),
        description:
            yup.string()
                .required("Description is missing"),
        amount:
            yup.number()
                .required("Coupon amount is required"),
                //category
        startDate:
            yup.date()
                .min(new Date(),'there is no option for previous time')
                .default(new Date())
                .typeError("You must specify a date")
                .required("Date is required")
                .nullable().default(() => new Date()),
        endDate:
            yup.date()
                .min(new Date(),'there is no option for previous time')
                .default(new Date())
                .typeError("You must specify a date")
                .required("Date is required")
                .nullable().default(() => new Date()),
        image:
            yup.string()
                .required("please insert a valid image link"),
        price:
            yup.number()
                .required("Please insert coupon price")
    });
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CouponPayloadModel>({ mode: "all", resolver: yupResolver(schema) });

        const postCoupon = async (coupon:CouponPayloadModel) => {
            await webApi.addCoupon(coupon)
            .then(res=>{
                notify.success("Coupon added successfully");
                store.dispatch(addedCouponAction(res.data));
                navigate("/coupons");
            })
            .catch(err => {
                notify.error(err);
            })
            console.log(coupon);
        }
    return (
        <div className="AddCoupon col">
			<h1>Add Coupon</h1>
            <form onSubmit={handleSubmit(postCoupon)}>
                {(errors.title)?<span>{errors.title?.message}</span>:<label htmlFor="title">Title</label>}
                <input {...register("title")} id="title" name="title" type="text" placeholder="Title..." />

                {(errors.description)?<span>{errors.description?.message}</span>:<label htmlFor="description">Description</label>} 
                <input {...register("description")} id="description" name="description" type="text" placeholder="Description..." />

                {(errors.amount)?<span>{errors.amount?.message}</span>:<label htmlFor="amount">Amount</label> } 
                <input {...register("amount")} id="amount" name="amount" type="number" placeholder="Amount..." />

                {(errors.startDate)?<span>{errors.startDate?.message}</span>:<label htmlFor="startDate">Start Date</label> }
                <input {...register("startDate")} id="startDate" name="startDate" type="datetime-local" placeholder="Start Date..." />
                {(errors.endDate)?<span>{errors.endDate?.message}</span>:<label htmlFor="endDate">End Date</label> }
                <input {...register("endDate")} id="endDate" name="endDate" type="datetime-local" placeholder="End Date..." />

                {(errors.image)?<span>{errors.image?.message}</span>:<label htmlFor="image">Image</label>} 
                <input {...register("image")} id="image" name="image" type="text" placeholder="image..." />

                {(errors.price)?<span>{errors.price?.message}</span>:<label htmlFor="price">Price</label> } 
                <input {...register("price")} id="price" name="price" type="price" placeholder="Price..." />

                <button disabled={!isValid} className="addButton">Add Coupon</button>
            </form>
        </div>
    );
}

export default AddCoupon;
