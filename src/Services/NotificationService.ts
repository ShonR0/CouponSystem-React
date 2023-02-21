import { Notyf } from "notyf";

class Notify {
private notification = new Notyf({
    duration: 4000,
    position: { x: "left", y: "bottom" },
});

public success(message: string) {
    this.notification.success(message);
}

public error(err:Error) {
    this.notification.error(this.extractMsg(err));
}

private extractMsg(err: any): string {
    if (typeof err === "string") {
        return err;
    }

    if (typeof err?.response?.data.value === "string") {
      //Backend exact error
        return err.response.data.value;
    }

    if (Array.isArray(err?.response?.data)) {
      // Backend exact error list
        return err?.response?.data[0];
    }

    // Must be last
    if (typeof err?.message === "string") {
        return err.message;
    }

    return "Miaouuuu, an error occurred, please try again.";
    }
}
const notify = new Notify();
export default notify;