import { Injectable, PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'searchSiteName'
})

@Injectable()
export class SearchSiteName implements PipeTransform {
	transform(data: any[], searchObj: any): any[] {
		let searchTerm: string = String(searchObj.siteName);
		searchTerm = searchTerm.toUpperCase();

		return data.filter(item => {
			return String(item.siteName).toUpperCase().indexOf(searchTerm) !== -1;
		});
	}
}
