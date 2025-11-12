export class CustomError extends Error {
    constructor(message, statusCode, success = false) {
        super(message);
        this.statusCode = statusCode;
        this.success = success;
    }
}