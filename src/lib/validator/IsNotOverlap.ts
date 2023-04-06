import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { DATE } from '../utils/date';

export function IsNotOverlap(property1: string, property2: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsNotOverlap',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property1, property2],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const beginProp: string = args.constraints[0];
                    const endProp: string = args.constraints[1];
                    for (let i = 0; i < value.length; i++) {
                        const res1 = value[i];
                        for (let j = i + 1; j < value.length - i; j++) {
                            const res2 = value[j];
                            if (
                                res1.key_item == res2.key_item &&
                                res1.key_tai_nguyen == res2.key_tai_nguyen &&
                                DATE.isOverlap(res1[beginProp], res1[endProp], res2[beginProp], res2[endProp])
                            ) {
                                return false
                            }
                        }
                    }
                    return true
                },
                defaultMessage(args: ValidationArguments) {
                    return `Data is overlapped`;
                }
            },
        });
    };
}