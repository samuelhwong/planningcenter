import {HttpError} from "./HttpErrors.js";

export class ServerProtocolError extends HttpError {
  constructor(response) {
    super(response);
  }
}

export class InternalServerError extends ServerProtocolError {
  constructor(response) {
    super(response);
  }
}

export class NotImplementedError extends ServerProtocolError {
  constructor(response) {
    super(response);
  }
}

export class BadGatewayError extends ServerProtocolError {
  constructor(response) {
    super(response);
  }
}

export class ServiceUnavailableError extends ServerProtocolError {
  constructor(response) {
    super(response);
  }
}

export class GatewayTimeoutError extends ServerProtocolError {
  constructor(response) {
    super(response);
  }
}