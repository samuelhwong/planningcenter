import {HttpError} from "./HttpErrors.js";

export class ClientProtocolError extends HttpError {
  constructor(response) {
    super(response);
  }
}

export class BadRequestError extends ClientProtocolError {
  constructor(response) {
    super(response);
  }
}

export class UnauthorizedError extends ClientProtocolError {
  constructor(response) {
    super(response);
  }
}

export class ForbiddenError extends ClientProtocolError {
  constructor(response) {
    super(response);
  }
}

export class NotFoundError extends ClientProtocolError {
  constructor(response) {
    super(response);
  }
}

export class MethodNotAllowedError extends ClientProtocolError {
  constructor(response) {
    super(response);
  }
}