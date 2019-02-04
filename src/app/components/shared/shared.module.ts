import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SocialLoginComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SideBarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SocialLoginComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SideBarComponent
  ],

})
export class SharedModule { }
