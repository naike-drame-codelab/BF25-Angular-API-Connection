import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { inject } from '@angular/core';
import { catchError, from, merge, mergeMap, of, tap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // if(req.url == '')
  //const token = localStorage.getItem('TOKEN');
  const sessionService = inject(SessionService);
  let session = sessionService.session();
  // const httpClient = inject(HttpClient);

  // s'il n'y a pas de session en cours, on passe à la requête suivante
  if (!session) {
    return next(req);
  }

  // si mon token a expiré
  if (session.exp < new Date()) {
    // return httpClient
    //   .get<{ token: string }>('http://localhost:5298/api/refreshToken', {
    //     params: {
    //       token: session.token,
    //     },
    //   })

    // OBSERVABLE 1
    // from() : transformer une promesse en observable
    return from(
      fetch(
        'http://localhost:5298/api/refreshToken?token=' + session.token
      ).then((res) => res.json())
      // pipe() : définition d'une suite d'opérations supplémentaires
    ).pipe(
      // tap() : effet de bord / side effect : faire une opération supplémentaire avant de passer à la suite
      tap(({ newToken }) => sessionService.startSession(newToken)), 
      // capturer une erreur de la requête de rafraîchissement
      catchError(() => {
        sessionService.clearSession();
        // retourne un observable demandé par catchError() qui emet un token null : équivalent : return of()
        return of({ newToken: null }); 
      }),
      // fusionner les observables et effectuer une requête supplémentaire
      mergeMap(({ newToken }) => {
        const clone = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        // OBSERVABLE 2
        return next(clone);
      })
    );
  } else {
    const clone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    return next(clone);
  }
};
