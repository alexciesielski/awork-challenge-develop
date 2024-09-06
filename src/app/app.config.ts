import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { UserHttpMockService } from './user-api/user-http-mock.service';
import { UserHttpService } from './user-api/user-http.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    {
      provide: UserHttpService,
      useClass: UserHttpMockService,
    },
  ],
};
