import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // For development use the mock service instead of the real service
    // since the API very quickly throws 429 Too Many Requests
    // Using `isDevMode()` does not eliminate dead code so I just manually comment out
    // {
    //   provide: UserHttpService,
    //   useClass: UserHttpMockService,
    // },

    {
      provide: APP_BASE_HREF,
      useValue: '/awork-challenge-develop',
    },
  ],
};
