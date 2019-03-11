import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgMapComponent } from '../../../../src/app/modules/svg-map/svg-map.component';
import { WithGoogleComponent } from '../../../../src/app/modules/svg-map/component/with-google/with-google.component';
import { WithoutGoogleComponent } from '../../../../src/app/modules/svg-map/component/without-google/without-google.component';
import { DialogPointComponent } from '../../../../src/app/modules/svg-map/component/dialog-point/dialog-point.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAreaComponent } from '../../../../src/app/modules/svg-map/component/dialog-area/dialog-area.component';
import { CountryWrapComponentModule } from './component/countries/country-wrap-component/country-wrap-module';
import { ICustomConfig } from './models/SettingsVM';

@NgModule({
  declarations: [
    SvgMapComponent,
    WithoutGoogleComponent,
    WithGoogleComponent,
    DialogPointComponent,
    DialogAreaComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CountryWrapComponentModule
  ],
  entryComponents: [DialogPointComponent, DialogAreaComponent],
  exports: [
    SvgMapComponent
  ]
})
export class SvgMapModule {
  static forRoot(config: ICustomConfig): ModuleWithProviders {
    // User config get logged here
    return {
      ngModule: SvgMapModule,
      providers: [{
        provide: 'configService',
        useValue: config
      }]
    };
  }
}
