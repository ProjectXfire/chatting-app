type TError = null | string;
type TMessage = null | string;

export interface IResponse<T> {
  data: T;
  successfulMessage: TMessage;
  errorMessage: TError;
}
