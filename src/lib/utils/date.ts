const Moment = require('moment');
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export class DATE {
    static formatDate = "YYYY-MM-DD"
    static formatFull = "YYYY-MM-DD HH:mm:ss"
    static formatAfter = "DD/MM/YYYY HH:mm:ss"
    static formatDDMMYYYY = "DD/MM/YYYY"
    static now() {
        return moment()
    }

    static date(date) {
        return moment(date)
    }

    static add(amount, unit, format) {
        return moment().add(amount, unit).format(format)
    }

    static formatDatabaseDateTime(date) {
        if (date) {
            return moment(date).format(this.formatFull)
        }
        return ""
    }

    static formatDateTime(date) {
        if (date) {
            return moment(date, this.formatFull).format(this.formatAfter)
        }
        return ""
    }

    static formatCustom(date, formatDate, format) {
        if (date) {
            return moment(date, formatDate).format(format)
        }
        return ""
    }

    static isBefore(date1, date2) {
        if (date1 && date2) {
            return moment(date1, this.formatFull).isBefore(moment(date2, this.formatFull))
        }
        return false;
    }

    static isOverlap(startDate1, endDate1, startDate2, endDate2) {
        const range1 = moment.range(moment(startDate1, this.formatFull), moment(endDate1, this.formatFull));
        const range2 = moment.range(moment(startDate2, this.formatFull), moment(endDate2, this.formatFull));
        return range1.overlaps(range2);
    }

}