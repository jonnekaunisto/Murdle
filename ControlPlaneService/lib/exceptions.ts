export class BaseException extends Error {
  public readonly body: { [key: string]: string };
  public readonly errorCode: number;

  public constructor(message: string, errorCode: number) {
    super(message);
    this.body = {
      message: message,
    };
    this.errorCode = errorCode;
  }
}

export class ValidationException extends BaseException {
  public constructor(message: string) {
    super(message, 400);
  }
}

export class AccessDeniedException extends BaseException {
  public constructor(message: string) {
    super(message, 403);
  }
}

export class ResourceNotFoundException extends BaseException {
  public constructor(message: string) {
    super(message, 404);
  }
}

export class InternalServerError extends BaseException {
  public constructor(message: string) {
    super(message, 500);
  }
}

// Higher Level

export class UserNotFoundException extends ResourceNotFoundException {
  public constructor(userId: string) {
    super(`User Not Found: ${userId}`);
  }
}