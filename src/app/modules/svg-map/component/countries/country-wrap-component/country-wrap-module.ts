import { NgModule } from '@angular/core';
import { CountryWrapComponent } from '../../../component/countries/country-wrap-component/country-wrap.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    CountryWrapComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [
    CountryWrapComponent
  ],
  entryComponents: [
    CountryWrapComponent,
  ],
})
export class CountryWrapComponentModule {}
