import {BaseCommand} from "../BaseCommand.js";

/**
 * Implements version: 2022-01-28
 */
export class CreateEmailCommand extends BaseCommand {
  constructor(id) {
    super();
    this.method = 'POST';
    this.url = `/people/v2/people/${id}/emails`;
  }
}