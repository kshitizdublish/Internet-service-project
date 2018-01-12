import { Injectable, PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'searchPipe'
})

@Injectable()
export class SearchPipe implements PipeTransform {
	transform(data: any[], searchObj: any): any[] {
		let searchTerm: string = String(searchObj.location);
		searchTerm = searchTerm.toUpperCase();
		return data.filter(item => {
			return String(item.location).toUpperCase().indexOf(searchTerm) !== -1
				|| String(item.customerName).toUpperCase().indexOf(searchTerm) !== -1
				|| String(item.tenantName).toUpperCase().indexOf(searchTerm) !== -1;
		});
	}
}
