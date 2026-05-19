export type ErrorDetails = Record<string, string[]>;

export class AppError extends Error {
  statusCode: number;
  code: string;
  details?: ErrorDetails;
  isOperational: boolean;

  constructor(message: string, statusCode: number, code: string, details?: ErrorDetails) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
  }
}
