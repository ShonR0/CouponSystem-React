import { CouponModel } from "../Models/Coupon";

export class CouponAppState {
    public coupons: CouponModel[] = [];
}

export enum ActionType {
    GOT_ALL_COUPONS = "GOT_ALL_COUPONS",
    GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
    ADD_COUPON = "ADD_COUPON",
    UPDATED_COUPON = "UPDATED_COUPON",
    DELETED_COUPON = "DELETED_COUPON",
    REMOVED_COUPONS = "REMOVED_COUPONS"
}

export interface CouponAction {
    type: ActionType;
    payload: any;
}

export function gotAllCouponsAction(coupons: CouponModel[]): CouponAction {
    return { type: ActionType.GOT_ALL_COUPONS, payload: coupons };
}

export function addedCouponAction(coupons: CouponModel): CouponAction {
    return  { type: ActionType.ADD_COUPON, payload: coupons };
}

export function deletedCouponAction(id: number): CouponAction {
    return { type: ActionType.DELETED_COUPON, payload: id };
}

export function updatedCouponAction(coupon: CouponModel): CouponAction {
    return { type: ActionType.UPDATED_COUPON, payload: coupon}
}

export function removeCoupons(): CouponAction {
    return { 
        type: ActionType.REMOVED_COUPONS,
        payload: {}
    };
}

export function couponsReducer(currentState: CouponAppState = new CouponAppState(),action:CouponAction): CouponAppState {

    const newState = {...currentState} //Spread Operator
    switch(action.type){
        case ActionType.GOT_ALL_COUPONS: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.ADD_COUPON: {
            newState.coupons.push(action.payload);
            break;
        }
        case ActionType.DELETED_COUPON: {
            newState.coupons = newState.coupons.filter(coupon => coupon.id !== action.payload)
            break;
        }
        case ActionType.UPDATED_COUPON: {
            const idx = newState.coupons.findIndex(coupon => coupon.id === action.payload.id);
            newState.coupons[idx] = action.payload;
            break;
        }
        case ActionType.REMOVED_COUPONS: {
            newState.coupons = [];
            break;
        }
    }

    return newState;
}