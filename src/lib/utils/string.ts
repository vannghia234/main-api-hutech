import * as _ from 'lodash'

export class STRING {
    static formatHoTen(fullName: string) {
        let name = _.split(fullName, ' ')
        let ho = _.pullAt(name, 0)[0]
        let ten = _.pullAt(name, name.length - 1)[0]
        let ten_lot = name;
        return {
            ho: ho,
            ten_lot: ten_lot.join(' '),
            ten: ten,
        }
    }
}
