export interface ApiError {
  name: string;            // class or friendly name
  statusCode: number;      // 400, 404, 500 …
  description: string;     // user‑visible summary
  isOperational: boolean;  // true = expected (handled) error
  errorStack: string;      // captured stack trace (optional)
  logingErrorResponse: boolean; // flag for your logger
}

export interface statusCode {      // record of common codes
  OK: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  FORBIDDEN: number;
  NOT_FOUND: number;
  INTERNAL_ERROR: number;
}
//Typescript types They give compile‑time guarantees that every custom error has these props.