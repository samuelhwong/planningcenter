export class HttpError extends Error {
  constructor(response) {
    super();
    this.name = this.constructor.name;
    this.data = response;
  }
}

export class HttpNoResponseError extends Error {
  constructor(error) {
    super(error.message);
    this.name = this.constructor.name;
    this.error = error;
  }
}