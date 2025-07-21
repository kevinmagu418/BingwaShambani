import { ApiError, statusCode } from './error-interface.js';

/*---------------- Base class ----------------*/
class AppError extends Error implements ApiError {
  // every property the interface demands
  name: string;
  statusCode: number;
  description: string;
  isOperational: boolean;
  errorStack: string;
  logingErrorResponse: boolean;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational = true,
    errorStack = '',
    logingErrorResponse = false
  ) {
    super(description);                     // fills Error.message
    Object.setPrototypeOf(this, new.target.prototype); // TS inheritance fix

    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logingErrorResponse = logingErrorResponse;

    Error.captureStackTrace(this);          // saves call‑stack into `stack`
  }
}

/*------------ Convenience subclass ----------*/
class APIError extends AppError {
  constructor(
    name: string,
    statusCode = 500,
    description = 'Internal Server Error',
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

/*---------- Enum‑as‑object of codes ---------*/
const STATUS_CODE: statusCode = {
  OK            : 200,
  BAD_REQUEST   : 400,
  UNAUTHORIZED  : 401,
  FORBIDDEN     : 403,
  NOT_FOUND     : 404,
  INTERNAL_ERROR: 500,
};

export { AppError, APIError, STATUS_CODE };
