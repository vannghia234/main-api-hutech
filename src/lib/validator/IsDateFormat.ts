import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import moment from 'moment';

export function IsDateFormat(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsDateFormat',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const format = args.constraints[0];
                    return typeof value === 'string' && typeof format === 'string' && moment(value, format, true).isValid();
                },
                defaultMessage(args: ValidationArguments) {
                    const format = args.constraints[0];
                    return `Invalid format, correct: ${format}`;
                }
            },
        });
    };
}