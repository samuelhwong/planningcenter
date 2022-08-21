export class InitializationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}