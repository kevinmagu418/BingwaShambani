/*---------------- Base class ----------------*/
class AppError extends Error {
    constructor(name, statusCode, description, isOperational = true, errorStack = '', logingErrorResponse = false) {
        super(description); // fills Error.message
        Object.setPrototypeOf(this, new.target.prototype); // TS inheritance fix
        this.name = name;
        this.statusCode = statusCode;
        this.description = description;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        this.logingErrorResponse = logingErrorResponse;
        Error.captureStackTrace(this); // saves call‑stack into `stack`
    }
}
/*------------ Convenience subclass ----------*/
class APIError extends AppError {
    constructor(name, statusCode = 500, description = 'Internal Server Error', isOperational = true) {
        super(name, statusCode, description, isOperational);
    }
}
/*---------- Enum‑as‑object of codes ---------*/
const STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};
export { AppError, APIError, STATUS_CODE };
