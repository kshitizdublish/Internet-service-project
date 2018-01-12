import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { AppConfigs } from '../../../common/app.config';
import { CustomEvents } from '../../../events/customevents';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
    query = '';
    filteredList = [];
    locations = [];

    constructor(private _customEvents: CustomEvents) { }

    filter() {
        if (this.query !== '') {
            this.filteredList = AppConfigs.siteLocations.filter(function (data) {
                return data.location.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ||
                       data.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item.location;
        // show the sites specific to the select location
        this._customEvents.showSitesEvt.emit({ locationData: item });
        this.filteredList = [];
    }

    clearText() {
        this.query = '';
    }

}
