import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as _ from 'lodash';
import moment from 'moment';

export function IsDatePropertyFormat(properties: string[], format, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsDateProperty',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [properties],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!_.isArray(value)) {
                        return false;
                    }

                    const properties: string = args.constraints[0];
                    for (let i = 0; i < value.length; i++) {
                        const res = value[i];
                        for (let j = 0; j < properties.length; j++) {
                            let p = properties[j]
                            if (typeof res[p] !== 'string' || typeof format !== 'string' || !moment(res[p], format, true).isValid()) {
                                return false;
                            }
                        }
                    }
                    return true
                },
                defaultMessage(args: ValidationArguments) {
                    return `Invalid format or date, format: ${format}`;
                }
            },
        });
    };
}