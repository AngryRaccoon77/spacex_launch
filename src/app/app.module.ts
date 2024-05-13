import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { SpaceXService } from './service/spacex.service';
import { CommonModule } from "@angular/common";
import { launchReducer } from './store/reducers/launch.reducer';
import { LaunchEffects } from "./store/effects/launch.effect";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({launch: launchReducer}),
    EffectsModule.forRoot([LaunchEffects])  // Import and register Effects (optional)
  ],
  providers: [SpaceXService, HttpClient],
})
export class AppModule {}
