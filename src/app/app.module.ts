import { OrgaosPage } from './../pages/orgaos/orgaos';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PartidoProvider } from '../providers/partido/partido';
import { InfopartidoPage } from '../pages/infopartido/infopartido';
import { InfomembroPage } from '../pages/infomembro/infomembro';
import { MembroProvider } from '../providers/membro/membro';
import { ProjetoProvider } from '../providers/projeto/projeto';
import { OrgaoProvider } from '../providers/orgao/orgao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InfopartidoPage,
    InfomembroPage,
    OrgaosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    HomePage,
    InfopartidoPage,
    InfomembroPage,
    OrgaosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PartidoProvider,
    MembroProvider,
    ProjetoProvider,
    OrgaoProvider
  ]
})
export class AppModule {}
