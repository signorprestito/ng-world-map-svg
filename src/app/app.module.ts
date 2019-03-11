import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SvgMapModule } from './modules/svg-map/svg-map.module';
import { ICustomConfig } from './modules/svg-map/models/SettingsVM';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SvgMapModule.forRoot(<ICustomConfig>{

      country : ["IT"],
      countryColors : ["orange"],
      googleAPIKey : "AIzaSyCInFXEeyWJ4My_N6tQanNzGQ7pbPOL-uA"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
