// loader-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {M4LoaderService} from '../m4-loader.service';

@Injectable()
export class M4LoaderHttpInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: M4LoaderService) {
  }

  removeRequest(req: HttpRequest<any>): boolean {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
    return (i >= 0);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.requests.push(req);

    console.log('No of requests--->' + this.requests.length);
    const that = this;
    this.loaderService.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              // this.removeRequest(req);
              if (this.removeRequest(req)) {
                observer.next(event);
              }
            }
          },
          err => {
            // this.removeRequest(req);
            if (this.removeRequest(req)) {
              observer.error(err);
            }
          },
          () => {
            // this.removeRequest(req);
            if (this.removeRequest(req)) {
              observer.complete();
            }
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
