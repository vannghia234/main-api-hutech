import { ValidationError as LibValidationError } from 'class-validator';

/**
 * class này dùng để format error của class-validator thành 1 message
 */
export class ValidationError extends Error {
  public readonly validateError: string[];

  constructor(validationErrors: LibValidationError[]) {
    super('Valdation Error');
    this.validateError = [].concat(
      ...validationErrors.map(error => Object.values(error.constraints)),
    );
  }
}
