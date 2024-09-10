import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('userToken') != null) {
    if (
      req.url.includes('cart') ||
      req.url.includes('orders') ||
      req.url.includes('addresses') ||
      req.url.includes('wishlist') ||
      req.url.includes('changeMyPassword') ||
      req.url.includes('updateMe')
    )
      req = req.clone({
        setHeaders: { token: localStorage.getItem('userToken')! },
      });
  }

  return next(req);
};
