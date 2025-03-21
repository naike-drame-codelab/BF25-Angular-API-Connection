import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'
import { MessageService } from 'primeng/api';
import { loaderInterceptor } from './interceptors/loader.interceptor';
import { tokenInterceptor } from './interceptors/token.interceptor';

// @Injectable({ providedIn: 'root' })
// export class Ressource2 {
//   test: number = 0;
//   method() {
//     console.log('appel de la méthode');
//   }
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    { provide: 'ressource1', useValue: 42 },
    provideHttpClient(withInterceptors([
      // on enregistre tous les interceptors (middleware) ici
      // loaderInterceptor,
      tokenInterceptor,
    ])),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService,
  ]
};

