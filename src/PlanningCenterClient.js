import axios from "axios";

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
      throw new Error(`authentication credentials are required`);
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
   * @returns {Promise<AxiosResponse<any>>}
   */
  async send(command) {
    const commandConfig = command.getConfig();
    return this.httpInstance.request(commandConfig);
  }

}
