import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipemodule } from '../utils/search/SearchPipemodule';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
    exports: [
        CommonModule,
        TranslateModule,
        AgmCoreModule,
        FormsModule,
        ReactiveFormsModule,
        SearchPipemodule,
        AgmSnazzyInfoWindowModule
    ]
})

export class SharedModule { }
