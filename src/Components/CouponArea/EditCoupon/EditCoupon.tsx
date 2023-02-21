import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./EditCoupon.css";
import { CouponModel, CouponPayloadModel } from "../../../Models/Coupon";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";
import { useState } from "react";
import store from "../../../Redux/Store";
import { useForm, useFormState } from "react-hook-form";
import { gotAllCouponsAction, updatedCouponAction } from "../../../Redux/CouponsAppState";

function EditCoupon(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0)

    const [obj, setObj] = useState<CouponModel>(store.getState().couponsReducer.coupons.filter(coupon => coupon.id === id)[0]);

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

    const putCoupon = async (coupon: CouponPayloadModel) => {
        await webApi.editCoupon(id, coupon)
        .then(res => {
            notify.success("Coupon updated successfully");
            store.dispatch(updatedCouponAction(obj))
            navigate("/coupons");
        })
        .catch(err => {
            notify.error(err);
        })
    }

    let defaultValuesObj = { ...obj };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
    = useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });

    return (
        <div className="EditCoupon">
			<h1>Edit Task</h1>
            <form onSubmit={handleSubmit(putCoupon)}>
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

                <button disabled={!isValid && !isDirty} className="editButton">Update Coupon</button>
            </form>
        </div>
    );
}

export default EditCoupon;
