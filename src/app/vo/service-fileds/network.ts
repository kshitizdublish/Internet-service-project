export class NetworkData {

	ipvpn = {
		'topology': '',
		'layer': '',
		'name': ''
	};
	internetAccess = {
		'name': '',
		'publicIp': '',
		'protectionType': '',
		'protectGourpId': '',
		'sourceCidrBlocks': '',
		'providerExtension': '',
		'description': ''
	};
	publicIp = {
		'quantity': '',
		'iPVersion': '',
		'cidr': '',
		'gatewayIP': ''
	};
	qOS = {
		'inBound': {
			'profileName': '',
			'direction': '',
			'description': ''
		},
		'outBound': {
			'profileName': '',
			'direction': '',
			'description': ''
		}
	};
	remoteAccess = {
		'name': '',
		'ipAddress': '',
		'maxOnlineUsers': '',
		'maxUsers': '',
		'description': ''
	};

}
