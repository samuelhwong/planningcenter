import {BaseCommand} from "../BaseCommand.js";

/**
 * Implements version: 2022-01-28
 */
export class UpdateEmailCommand extends BaseCommand {
  constructor(id) {
    super();
    this.method = 'PATCH';
    this.url = `/people/v2/emails/${id}`;
  }
}