import { Injectable, PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'searchCustomer'
})

@Injectable()
export class SearchCustomer implements PipeTransform {
	transform(data: any, searchObj: any): any[] {
		let searchTerm: string = String(searchObj.location);
    searchTerm = searchTerm.toUpperCase();

    if ( data.length > 0) {
      return data.forEach( (element: any) => {
        return element.filter(item => {
          return String(item.location).toUpperCase().indexOf(searchTerm) !== -1
            || String(item.customerName).toUpperCase().indexOf(searchTerm) !== -1
            || String(item.tenantName).toUpperCase().indexOf(searchTerm) !== -1;
        });

      });
    }

	}
}
