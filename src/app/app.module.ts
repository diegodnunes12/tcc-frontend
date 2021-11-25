import { NovaSenhaComponent } from './pages/nova-senha/nova-senha.component';
import { EsqueciMinhaSenhaComponent } from './pages/esqueci-minha-senha/esqueci-minha-senha.component';
import { NovaOngComponent } from './pages/nova-ong/nova-ong.component';
import { NovoUsuarioComponent } from './pages/novo-usuario/novo-usuario.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteModule } from './cliente/cliente.module';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './core/componentes/header/header.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NovoUsuarioComponent,
    NovaOngComponent,
    HeaderComponent,
    EsqueciMinhaSenhaComponent,
    NovaSenhaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    ClienteModule,
    CoreModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '629192026087-s15fiuh8macetpr25chb509haaqe4osf.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
