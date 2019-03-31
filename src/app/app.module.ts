import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AuthGuard } from './auth/auth.guard';
import { ElectionService } from './services/election.service';
import { JwtService } from './services/jwt.service';
import { UserService } from './services/user.service';
import { AgoraSocialUserService } from './services/agora-social-user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SharedModule } from './components/shared/shared.module';
import { ElectionDataService } from './services/election-data.service';
import { VotingService } from './services/voting.service';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('209457566270746')
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary btn-gold',
      cancelButtonClass: 'btn'
    }),
    DragulaModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    UserService,
    JwtService,
    ElectionService,
    ElectionDataService,
    AgoraSocialUserService,
    VotingService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
