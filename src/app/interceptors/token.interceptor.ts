import { HttpInterceptorFn } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // if(req.url == '')
  //const token = localStorage.getItem('TOKEN');
  const sessionService = inject(SessionService)
  if (!sessionService.session().isAuthenticated) {
    return next(req);
  }
  const clone = req.clone({
    setHeaders: {
      Authorization: `Bearer ${sessionService.session().token}`,
    },
  });
  return next(clone);
};
