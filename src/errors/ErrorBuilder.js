import {
  BadRequestError, ClientProtocolError,
  ForbiddenError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError
} from "./ClientProtocolErrors.js";
import {
  BadGatewayError, GatewayTimeoutError,
  InternalServerError,
  NotImplementedError, ServerProtocolError,
  ServiceUnavailableError
} from "./ServerProtocolErrors.js";

/**
 * Returns an error instance based on the response status code.
 * @param e axios error object
 * @returns {ServiceUnavailableError|ClientProtocolError|MethodNotAllowedError|InternalServerError|BadRequestError|UnauthorizedError|GatewayTimeoutError|ForbiddenError|NotImplementedError|BadGatewayError|NotFoundError|ServerProtocolError}
 */
export function errorBuilder(e) {
  let res = {
    data: e.response.data,
    status: e.response.status,
    statusText: e.response.statusText,
    headers: e.response.headers
  };
  const {status} = res;
  if (status >= 400 && status < 500) {
    // Client side error
    switch (status) {
      case 400:
        return new BadRequestError(res);
      case 401:
        return new UnauthorizedError(res);
      case 403:
        return new ForbiddenError(res);
      case 404:
        return new NotFoundError(res);
      case 405:
        return new MethodNotAllowedError(res);
      default:
        return new ClientProtocolError(res);
    }
  } else if (status >= 500) {
    // Server side error
    switch (status) {
      case 500:
        return new InternalServerError(res);
      case 501:
        return new NotImplementedError(res);
      case 502:
        return new BadGatewayError(res);
      case 503:
        return new ServiceUnavailableError(res);
      case 504:
        return new GatewayTimeoutError(res);
      default:
        return new ServerProtocolError(res);
    }
  }
  throw new Error(`Status ${status} not implemented - is it a real error?`);
}