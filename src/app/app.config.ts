import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {httpInterceptor} from "./interceptor/http.interceptor";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {reducers} from "./store/reducer/main.reducer";
import {AuthenticationEffect} from "./store/effect/authentication.effect";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {storageSyncMetaReducer} from "ngrx-store-persist";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([httpInterceptor]), withFetch()),
    provideStore(reducers,{metaReducers : [storageSyncMetaReducer]}),
    provideEffects([
      AuthenticationEffect,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
  ]
};
