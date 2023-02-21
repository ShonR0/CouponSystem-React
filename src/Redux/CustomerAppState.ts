import { number } from "yup";
import { Customer, UserType } from "../Models/Auth";
import { CustomerModel } from "../Models/Customer";

export class UserAppState {
    // Step 1 - Define User global app state
    public customer: Customer = { email:"", token:"", userType: null };
    public getCustomer: CustomerModel[] = [];
}

// Step 2 - Define all actions
export enum ActionType {
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT",
    REGISTERED = "REGISTERED",
    GOT_ALL_CUSTOMERS = "GOT_ALL_CUSTOMERS",
    DELETED_CUSTOMER = "DELETED_CUSTOMER",
}

// Step 3 - define what is action in terms of data
export interface UserAction {
    type: ActionType;
    payload: any;
}

// Step 4 - Create creator function
export function gotAllCustomersAction(customers: CustomerModel[]): UserAction {
    return { type: ActionType.GOT_ALL_CUSTOMERS, payload: customers };
}

export function deletedCustomerAction(id: number): UserAction {
    return { type: ActionType.DELETED_CUSTOMER, payload: id };
}

export function loggedIn(customer: Customer): UserAction {
    return{
        type: ActionType.LOGGED_IN,
        payload: customer
    }
}
export function registered(): UserAction {
    return{
        type: ActionType.REGISTERED,
        payload: {}
    }
}
export function loggedOut(): UserAction {
    return{
        type: ActionType.LOGGED_OUT,
        payload: {}
    }
}

// Step 5 - Reducer function perform the required action
export function customerReducer(currentState: UserAppState = new UserAppState(),action:UserAction): UserAppState {
    const newState = {...currentState} //Spread Operator
    switch(action.type){
        case ActionType.GOT_ALL_CUSTOMERS: {
            newState.customer = action.payload;
            break;
        }
        case ActionType.DELETED_CUSTOMER: {
            newState.getCustomer = newState.getCustomer.filter(customer => customer.id !== action.payload)
            break;
        }
        case ActionType.LOGGED_IN: {
            newState.customer = action.payload;
            break;
        }
        case ActionType.LOGGED_OUT: {
            newState.customer = { email:"", token:"", userType: null };
            break;
        }
        case ActionType.REGISTERED: {
            
        }
    }
    return newState;
}