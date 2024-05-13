import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideStore, Store} from '@ngrx/store';


import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {launchReducer} from "./store/reducers/launch.reducer";
import {LaunchEffects} from "./store/effects/launch.effect";
import {provideEffects} from "@ngrx/effects";
import {loadNextLaunch, loadNextLaunchSuccess} from "./store/actions/launch.action";
import {NextLaunchComponent} from "./component/next-lauch/next-launch.compoent";



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),provideStore({launch: launchReducer}),
    provideEffects([LaunchEffects]),NextLaunchComponent ]

};

