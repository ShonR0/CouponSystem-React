abstract class Config {

}

class Development extends Config {
    public urls = {
        "auth" : "http://localhost:8080/api/CouponSystem/auth",
        "admin" : "http://localhost:8080/api/CouponSystem/admin",
        "customers" : "http://localhost:8080/api/CouponSystem/customers",
        "companies" : "http://localhost:8080/api/CouponSystem/companies",
        "coupons" : "http://localhost:8080/api/CouponSystem/coupons",
    }
}

class Production extends Config {
    public urls = {
        "auth" : "http://localhost:8080/api/auth", //???
        "admin" : "http://couponosh/api/customers",
        "customers" : "http://couponosh/api/customers",
        "companies" : "http://couponosh/api/companies",
        "coupons" : "http://couponosh/api/coupons",
    }
}

const Global = process.env.NODE_ENV === "development" ? new Development() : new Production();

export default Global;
