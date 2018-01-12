import { NgModule } from '@angular/core';
import { SearchPipe } from './SearchPipe';
import { SearchSiteName } from './SearchSiteName';
import { SearchCustomer } from './SearchCustomer';

@NgModule({
  imports: [],
  declarations: [ SearchPipe, SearchSiteName, SearchCustomer ],
  exports: [ SearchPipe, SearchSiteName, SearchCustomer ]
})

export class SearchPipemodule {}
