import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatCheckboxModule
} from '@angular/material';
import { AdminLayoutRoutes, routingComponents } from './admin-layout.routing';
import { SharedModule } from '../../components/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    SweetAlert2Module,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [
    routingComponents
  ]
})

export class AdminLayoutModule {}
