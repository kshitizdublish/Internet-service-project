import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../common/SharedModule';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [LoginComponent, FooterComponent],
    exports: [LoginComponent]
})

export class LoginModule { }
