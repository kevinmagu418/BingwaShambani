import { STATUS_CODE } from '../utils/Errors/app-error.js';
const ErrorHandler = (err, _req, res, _next) => {
    console.error(err.stack); // server‑side log
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_ERROR;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
};
export { ErrorHandler };
