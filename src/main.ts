import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  getAllDataFromLocalForage,
  default as localForage,
} from 'ngrx-store-persist';

getAllDataFromLocalForage({
  driver: localForage.INDEXEDDB,
  keys: ['userDetails'],
}).then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
});
