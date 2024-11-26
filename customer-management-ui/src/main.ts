import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {CustomerProfileComponent} from './app/components/customer-profile/customer-profile.component'

bootstrapApplication(CustomerProfileComponent, appConfig)
  .catch((err) => console.error(err));
