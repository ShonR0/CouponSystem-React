import { Company, UserType } from "../Models/Auth";
import { CompanyModel } from "../Models/Company";

export class CompanyAppState {
    // Step 1 - Define User global app state
    public company: Company = { email:"", token:"", userType: null };
    public getCompany: CompanyModel[] = [];
}

// Step 2 - Define all actions
export enum ActionType {
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT",
    REGISTERED = "REGISTERED",
    GOT_ALL_COMPANIES = "GOT_ALL_COMPANIES",
    DELETED_COMPANY = "DELETED_COMPANY",
}

// Step 3 - define what is action in terms of data
export interface CompanyAction {
    type: ActionType;
    payload: any;
}

// Step 4 - Create creator function
export function gotAllCompaniesAction(customers: CompanyModel[]): CompanyAction {
    return { type: ActionType.GOT_ALL_COMPANIES, payload: customers };
}

export function deletedCompaniesAction(id: number): CompanyAction {
    return { type: ActionType.DELETED_COMPANY, payload: id };
}

export function loggedIn(company: Company): CompanyAction {
    return{
        type: ActionType.LOGGED_IN,
        payload: company
    }
}
export function registered(): CompanyAction {
    return{
        type: ActionType.REGISTERED,
        payload: {}
    }
}
export function loggedOut(): CompanyAction {
    return{
        type: ActionType.LOGGED_OUT,
        payload: {}
    }
}

// Step 5 - Reducer function perform the required action
export function companyReducer(currentState: CompanyAppState = new CompanyAppState(),action:CompanyAction): CompanyAppState {
    const newState = {...currentState} //Spread Operator
    switch(action.type){
        case ActionType.GOT_ALL_COMPANIES: {
            newState.company = action.payload;
            break;
        }
        case ActionType.DELETED_COMPANY: {
            newState.getCompany = newState.getCompany.filter(customer => customer.id !== action.payload)
            break;
        }
        case ActionType.LOGGED_IN: {
            newState.company = action.payload;
            break;
        }
        case ActionType.LOGGED_OUT: {
            newState.company = { email:"", token:"", userType: null };
            break;
        }
        case ActionType.REGISTERED: {
            
        }
    }
    return newState;
}