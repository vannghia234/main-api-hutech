import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function NotNullOrUndefinedString(
  validationOptions?: ValidationOptions,
) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: 'notNullOrUndefinedString',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: '$property must not "null" or "undefined"',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            value.toLocaleLowerCase() !== 'null' &&
            value.toLocaleLowerCase() !== 'undefined'
          );
        },
      },
    });
  };
}
