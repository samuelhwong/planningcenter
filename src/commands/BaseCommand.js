export class BaseCommand {
  constructor() {
    this.method = 'GET';
    this.url = '/';
    this.data = {};
    this.headers = {};
    this.params = {};
    this.snakeToCamel = str =>
      str.toLowerCase().replace(/([_][a-z])/g, group =>
        group
          .toUpperCase()
          .replace('_', '')
      );
    this.capitalizeFirstLetter = str =>
      str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  /**
   * Creates includeXXX helper functions from a list of include params.
   * For example, ['marital_status'] will result in a function `includeMaritalStatus`
   * that sets the `include=marital_status` parameter into the command/request.
   * Multiple include params will produce a comma-separate string.
   * @param includeParams an array of include parameters, in snake_case
   */
  initIncludes(includeParams) {
    // Maintain a list of includes that are currently enabled.
    this._includesList = [];
    
    includeParams.forEach(name => {
      this[`include${this.capitalizeFirstLetter(this.snakeToCamel(name))}`] = function(enabled = true) {
        const index = this._includesList.indexOf(name);
        if (enabled && index === -1) {
          // Push a new include into the list if it doesn't already exist.
          this._includesList.push(name);
        } else if (!enabled && index !== -1) {
          // Remove an include from the list if it is present.
          this._includesList.splice(index, 1);
        }
        if (this._includesList.length === 0) {
          delete this.params['include'];
        } else {
          this.params['include'] = this._includesList.join(",");
        }
        return this;
      }
    });
  }
  
  /**
   * Creates queryByXXX helper functions from a list of where params.
   * For example, [`created_at`] will result in a function `queryByCreatedAt`
   * that sets the `where[created_at]` parameter into the command/request.
   * @param whereParams an array of where parameters, in snake_case
   */
  initQueryBy(whereParams) {
    whereParams.forEach(name => {
      this[`queryBy${this.capitalizeFirstLetter(this.snakeToCamel(name))}`] = function(value) {
        this.params[`where[${name}]`] = value;
        return this;
      }
    });
  }
  
  /**
   * Creates orderByXXX helper functions from a list of order params.
   * For example, ['birthdate'] will result in a function `orderByBirthdate`
   * that sets the `order[birthdate]` parameter into the command/request.
   * @param orderParams an array of order parameters, in snake_case
   */
  initOrderBy(orderParams) {
    orderParams.forEach(name => {
      this[`orderBy${this.capitalizeFirstLetter(this.snakeToCamel(name))}`] = function() {
        this.params['order'] = name;
      }
    })
  }
  
  /**
   * Sets how many records to return per page. Min of 1, max of 100, default 25.
   * @param num
   * @returns {BaseCommand}
   */
  paginatePerPage(num) {
    if (num < 1 || num > 100) {
      throw new Error(`paginate per page must be min of 1, max of 100`);
    }
    this.params['per_page'] = num;
    return this;
  }
  
  /**
   * Sets the pagination offset.
   * @param num
   * @returns {BaseCommand}
   */
  paginateOffset(num) {
    this.params['offset'] = num;
    return this;
  }
  
  /**
   * Sets attributes into the data payload.
   * @param attrs
   * @returns {BaseCommand}
   */
  attributes(attrs) {
    this.data = {
      data: {
        attributes: attrs
      }
    }
    return this;
  }
  
  /**
   * Returns a config object suitable for the axios instance.
   * @returns {{headers: (*|{}), method: string, data: (*|{}), params: (*|{}), url: string, maxRedirects: number}}
   */
  getConfig() {
    return {
      method: this.method,
      url: this.url,
      data: this.data,
      headers: this.headers,
      params: this.params,
      
      // `maxRedirects` defines the maximum number of redirects to follow
      // in node.js. If set to 0, no redirects will be followed.
      maxRedirects: 0
    };
  }
}