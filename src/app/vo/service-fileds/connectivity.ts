export class ConnectivityData {

        siteBasic = {
            'name': '',
            'location': '',
            'description': '',
            'wanAccessType': '',
            'localCpeType': '',
            'areaName': '',
            'totalUpstreamBandwidth': '',
            'totalDownstreamBandwidth': '',
            'vpnUpstreamBandwidth': '',
            'vpnDownstreamBandwidth': '',
            'upstreamQosProfile': '',
            'downstreamQosProfile': ''
        };
        virtualRouters = {
            'name': '',
            'description': '',
            'gwId': '',
            'siteId': ''
        };
        cpe = {
            'name': '',
            'description': '',
            'siteId': '',
            'esn': '',
            'runningStatus': ''
        };
        vlan = {
            'name': '',
            'description': '',
            'siteId': '',
            'vlan': '',
            'trunkVlan': '',
            'ports': '',
            'portsNames': ''
        };
        subnet = {
            'name': '',
            'description': '',
            'siteId': '',
            'virtualRouteId': '',
            'vlanId': '',
            'ip_version': '',
            'pageSize': '',
            'pageNum': ''
        };
    }

