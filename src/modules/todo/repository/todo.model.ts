import * as _ from "lodash";
import moment from "moment";
import { DATE } from "../../../lib/utils/date";

export class Todo {
    public id: number;
    public content: string;
    public checked: boolean;
    public time_create: string;
    public time_update: string;

    constructor(args?) {
        const {
            id = 0,
            content = "",
            checked = false,
            time_create = new Date(),
            time_update = new Date(),
        } = args || {};
        this.id = id;
        this.content = content;
        this.checked = checked;
        this.time_create = moment(time_create).format(DATE.formatAfter);
        this.time_update = moment(time_update).format(DATE.formatAfter);
    }
}