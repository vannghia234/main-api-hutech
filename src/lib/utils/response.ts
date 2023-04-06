import { Result } from './result';

export class ResponseHelper {
  public static OK(value?: any) {
    return { status: 'success', result: value };
  }

  public static BAD(message: any) {
    return { status: 'error', message };
  }

  public static fromResult(result: Result<any>) {
    if (result.isFailure) {
      return ResponseHelper.BAD(result.error);
    }

    return ResponseHelper.OK(result.getValue());
  }
}
