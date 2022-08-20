import {BaseCommand} from "../BaseCommand.js";

/**
 * Implements version: 2022-01-28
 */
export class GetPersonCommand extends BaseCommand {
  constructor() {
    super();
    this.method = 'GET';
    this.url = '/people/v2/people';
    
    const whereParams = [
      'accounting_administrator',
      'anniversary',
      'birthdate',
      'child',
      'created_at',
      'first_name',
      'gender',
      'given_name',
      'grade',
      `graduation_year`,
      'id',
      'inactivated_at',
      'last_name',
      'medical_notes',
      'membership',
      'middle_name',
      'nickname',
      'people_permissions',
      'remote_id',
      'search_name',
      'search_name_or_email',
      'search_name_or_email_or_phone_number',
      'search_phone_number',
      'search_phone_number_e164',
      'site_administrator',
      'status',
      'updated_at'
    ];
    this.initQueryBy(whereParams);

    const orderParams = [
      'accounting_administrator',
      'anniversary',
      'birthdate',
      'child',
      'created_at',
      'first_name',
      'gender',
      'given_name',
      'grade',
      'graduation_year',
      'inactivated_at',
      'last_name',
      'membership',
      'middle_name',
      'nickname',
      'people_permissions',
      'remote_id',
      'site_administrator',
      'status',
      'updated_at'
    ];
    this.initOrderBy(orderParams);
    
    const includeParams = [
      'addresses',
      'emails',
      'field_data',
      'households',
      'inactive_reason',
      'marital_status',
      'name_prefix',
      'name_suffix',
      'organization',
      'person_apps',
      'phone_numbers',
      'platform_notifications',
      'primary_campus',
      'school',
      'social_profiles'
    ];
    this.initIncludes(includeParams);
  }
}
