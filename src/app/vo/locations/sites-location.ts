export class SiteLocation {

	id = '';
	tenantId = '';
	name = '';
	description = '';
	location = '';
	wanAccessType = '';
	localCpeType = '';
	area = '';
	areaName = '';
	totalUpstreamBandwidth = 0;
	totalDownstreamBandwidth = 0;
	vpnUpstreamBandwidth = 0;
	vpnDownstreamBandwidth = 0;
	upstreamQosProfile = 0;
	downstreamQosProfile = 0;
	createtime = 0;
	actionState = '';
	providerExtension: any;
	latitude = 0;
	longitude = 0;
	cordins: Array<any> = [];
	runningStatus= '';

}
