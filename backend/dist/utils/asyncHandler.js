/** Wrap an async controller so rejected Promises hit Express error handler */
export const asyncHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);
