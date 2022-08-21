import axios from "axios";
import {InitializationError} from "./errors/InitializationError.js";
import {errorBuilder} from "./errors/ErrorBuilder.js";
import {HttpNoResponseError, HttpNoResponseError} from "./errors/HttpErrors.js";

const PLANNING_CENTER_ENDPOINT = 'https://api.planningcenteronline.com';
const DEFAULT_TIMEOUT = 3000;

/**
 * Client that calls the planningcenter API. Implements the command pattern
 * to handle different types of API calls.
 */
export class PlanningCenterClient {
  
  constructor({baseURL, applicationId, secret, accessToken, timeout}) {
    this.baseURL = baseURL;
    this.applicationId = applicationId;
    this.secret = secret;
    this.accessToken = accessToken;
    this.timeout = timeout || DEFAULT_TIMEOUT;
    if (accessToken) {
      this.createClientWithAccessToken();
    } else if (applicationId && secret) {
      this.createClientWithBasicAuth();
    } else {
      throw new InitializationError(`authentication credentials are required`);
    }
  }
  
  createClientWithAccessToken() {
    this.httpInstance = axios.create({
      baseURL: this.baseURL || PLANNING_CENTER_ENDPOINT,
      timeout: this.timeout,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }
  
  createClientWithBasicAuth() {
    this.httpInstance = axios.create({
      baseURL: this.baseURL || PLANNING_CENTER_ENDPOINT,
      timeout: this.timeout,
      auth: {
        username: this.applicationId,
        password: this.secret
      }
    });
  }
  
  /**
   * Invokes a command, sending an API call.
   * @param command
   * @returns {Promise<{headers: any, data: any, statusText: string, status: number}>}
   */
  async send(command) {
    const commandConfig = command.getConfig();
    try {
      let result = await this.httpInstance.request(commandConfig);
      // Wrap the axios response with our own response object. This gives
      // us greater insulation should the axios library change.
      // Note, the axios response object has a circular reference within it,
      // which makes it difficult to stringify.
      return {
        data: result.data,
        status: result.status,
        statusText: result.statusText,
        headers: result.headers
      };
    } catch (e) {
      // Throw our own error object that wraps the axios error. This gives us
      // greater insulation should the axios library change. Callers can also
      // use `instanceof` to determine the type of error.
      if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx.
        throw errorBuilder(e);
      } else if (e.request) {
        // The request was made but no response was received
        // `e.request` is an instance of http.ClientRequest in node.js
        throw new HttpNoResponseError(e);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw e;
      }
    }
  }

}
