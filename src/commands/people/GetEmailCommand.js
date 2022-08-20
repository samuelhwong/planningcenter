import {BaseCommand} from "../BaseCommand.js";

/**
 * Implements version: 2022-01-28
 */
export class GetEmailCommand extends BaseCommand {
  constructor() {
    super();
    this.method = 'GET';
    this.url = '/people/v2/emails';
    
    const whereParams = [
      'address',
      'blocked',
      'created_at',
      'location',
      'primary',
      'updated_at'
    ];
    this.initQueryBy(whereParams);
    
    const orderParams = [
      'address',
      'created_at',
      'location',
      'primary',
      'updated_at'
    ];
    this.initOrderBy(orderParams);
  }
}