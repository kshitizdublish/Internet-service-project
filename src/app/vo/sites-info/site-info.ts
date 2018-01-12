export class SiteInfo {
	static SiteInfoMetaData = [
		{
			name: 'All Sites',
			imgPath: './assets/navs/all_sites.png',
			activeImgPath: './assets/navs/all_sites_active.png',
			attr: 'totalSites',
			status: 'allState'
		},
		{
			name: 'Sites(Online)',
			imgPath: './assets/navs/sites_online.png',
			activeImgPath: './assets/navs/all_sites_active.png',
			attr: 'totalAlarms',
			status: 'online'
		},
		{
			name: 'Sites(Offline)',
			imgPath: './assets/navs/sites_offline.png',
			activeImgPath: './assets/navs/all_sites_active.png',
			attr: 'totalIpVPNs',
			status: 'Offline'
		},
		{
			name: 'Inactive',
			imgPath: './assets/navs/sites_inactive.png',
			activeImgPath: './assets/navs/all_sites_active.png',
			attr: 'totalInternetAccess',
			status: 'deactive'
		},
		{
			name: 'IP Vpn',
			imgPath: './assets/navs/sites_ipvpn.png',
			activeImgPath: './assets/navs/sites_ipvpn.png',
			attr: 'totalIpVPNs',
			status: 'noState'
		},
		{
			name: 'Internet Acess',
			imgPath: './assets/navs/sites_internet.png',
			activeImgPath: './assets/navs/sites_internet.png',
			attr: 'totalInternetAccess',
			status: 'noState'
		},
		{
			name: 'Remote Access',
			imgPath: './assets/navs/sites_remote.png',
			activeImgPath: './assets/navs/sites_remote.png',
			attr: 'totalBusinessAnyWhere',
			status: 'noState'
		},
		{
			name: 'Public IP',
			imgPath: './assets/navs/sites_public.png',
			activeImgPath: './assets/navs/sites_public.png',
			attr: 'totalPublicIp',
			status: 'noState'
		}
	];
}
