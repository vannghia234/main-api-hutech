import * as _ from "lodash";

export class Log {
    public key_unit: string;
    public key_item: string;
    public time_create: string;
    public log_content: LogContent;

    constructor(args?) {
        const {
            key_unit = "",
            key_item = "",
            time_create = new Date(),
            message = "",
            user = "",
        } = args || {};
        this.key_unit = key_unit;
        this.key_item = key_item;
        this.time_create = time_create;
        this.log_content = new LogContent({
            message,
            user
        });
    }
}

class LogContent {

    public message: string;
    public user: string;

    constructor(args?) {
        const {
            message = "",
            user = ""
        } = args || {};
        this.message = message;
        this.user = user;
    }
}