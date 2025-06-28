export enum EnumResponseCode {
    Error = "Error",
    Failed = "Failed",
    Invalid = "Invalid",
    NotFound = "NotFound",
    NotAllowed = "NotAllowed",
    Duplicate = "Duplicate",
    Timeout = "Timeout",
    Internal = "Internal",
    Success = "Success",
  }
  
  export interface IResponse<T> {
    code: EnumResponseCode;
    message: string;
    data?: T;
  }
  
  export interface IResponseValidParam {
    valid: boolean;
    id: string;
  }
  