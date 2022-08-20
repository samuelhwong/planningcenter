import {BaseCommand} from "../BaseCommand.js";

/**
 * Implements version: 2022-01-28
 */
export class DeleteEmailCommand extends BaseCommand {
  constructor(id) {
    super();
    this.method = 'DELETE';
    this.url = `/people/v2/emails/${id}`;
  }
}