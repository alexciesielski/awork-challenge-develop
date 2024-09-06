import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { UserHttpMockService } from './user-api/user-http-mock.service';
import { UserHttpService } from './user-api/user-http.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    ...[
      isDevMode()
        ? // For development use the mock service instead of the real service
          // since the API very quickly throws 429 Too Many Requests
          {
            provide: UserHttpService,
            useClass: UserHttpMockService,
          }
        : [],
    ],
  ],
};
