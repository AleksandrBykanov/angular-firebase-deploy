import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enviroment } from 'environments/environment';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (enviroment.production) {
  enableProdMode()
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
