import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // if(req.url == '')

  const token = localStorage.getItem('TOKEN');
  if (!token) {
    return next(req);
  }
  const clone = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(clone);
};
