import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Configuration } from './app.constants';
import { routing } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AutoLoginComponent } from './auto-login/auto-login.component';

import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpClientModule,
        AuthModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        ForbiddenComponent,
        HomeComponent,
        AutoLoginComponent,
        NavigationComponent,
        UnauthorizedComponent
    ],
    providers: [
        OidcSecurityService,
        Configuration
    ],
    bootstrap:    [AppComponent],
})

export class AppModule {
    constructor(public oidcSecurityService: OidcSecurityService) {

        let openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
        openIDImplicitFlowConfiguration.stsServer = 'https://accounts.google.com';
        openIDImplicitFlowConfiguration.redirect_url = 'https://localhost:44386';
        openIDImplicitFlowConfiguration.client_id = '188968487735-b1hh7k87nkkh6vv84548sinju2kpr7gn.apps.googleusercontent.com';
        openIDImplicitFlowConfiguration.response_type = 'id_token token';
        openIDImplicitFlowConfiguration.scope = 'openid email profile';
        openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'https://localhost:44386/Unauthorized';
        openIDImplicitFlowConfiguration.post_login_route = '/home';
        openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
        openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
        openIDImplicitFlowConfiguration.trigger_authorization_result_event = true;
        openIDImplicitFlowConfiguration.log_console_warning_active = true;
        openIDImplicitFlowConfiguration.log_console_debug_active = true;
        openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 20;
        openIDImplicitFlowConfiguration.override_well_known_configuration = false;
        openIDImplicitFlowConfiguration.override_well_known_configuration_url = 'https://localhost:44386/wellknownconfiguration.json';

        this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
    }
}
