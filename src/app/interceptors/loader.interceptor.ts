import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log('Une requête est lancée sur ' + req.url);
  // if(!req.url.startsWith('http://localhost:5298/api/article')) {
  //   return throwError(() =>  'Vous n\'avez pas le droit de faire cette requête');
  // }
  const loaderService = inject(LoaderService);

  // afficher un loader
  loaderService.isLoading.set(true);

  return next(req).pipe(
    // ajouter un délai d'affichage du loader de 500ms
    delay(200),
    // exécute une opération à la fin de l'observable
    finalize(() => {
      // faire disparaître le loader
      loaderService.isLoading.set(false);
    })
  );
};
