import { combineReducers, createStore } from "redux";
import { companyReducer } from "./CompanyAppState";
import { couponsReducer } from "./CouponsAppState";
import { customerReducer } from "./CustomerAppState";
import { adminReducer } from "./AdminAppState";


//Multiple catsReducer
const reducers = combineReducers({couponsReducer: couponsReducer, adminReducer: adminReducer, customerReducer: customerReducer, companyReducer: companyReducer});
const store = createStore(reducers);

// For getting data
//const xyz = store.getState().catState.cats;

export default store;