export class User {

	sessionId = '';
	name = '';
	roles = '';
	permission: any;
	permDecoder: any;

	/**
	 * CRUDD = 00000
	 * Create 		= 0 || 1
	 * Read				= 0 || 1
	 * Update			= 0 || 1
	 * Delete			= 0 || 1
	 * Deactivate	= 0 || 1
	 */

	// SITEOPS_NETWORK_MAP_DASHBOARD:11100
	// AGGREGATED_STATISTICS_DASHBOARD=01000
	// AGGREGATED_STATISTICS_DASHBOARD=01000
	// MANAGE_SITE_FOR_CUSTOMER:01100

	hasCreateSite = true;
	hasReadSite = true;
	hasUpdateSite = true;
	hasDeleteSite = true;
	hasDeactivateSite = true;

	hasWifi = true;
	hasACL = true;

}
