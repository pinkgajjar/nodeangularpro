import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse,HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { AuthService } from '../auth/auth.service';

import { Router } from "@angular/router";

 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor(private router: Router, public auth: AuthService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
     
        // if (localStorage.getItem("tokenstore") != null) {
        //     const clonedreq = req.clone({
        //         headers: req.headers.set("Authorization", localStorage.getItem("tokenstore"))
        //     });
        //     return next.handle(clonedreq)
        //         .do(
        //         succ => { },
        //         err => {
        //             if (err.status === 401)
        //                 this.router.navigateByUrl('/login');
        //         }
        //         );
        // }
        // else {
        //     this.router.navigateByUrl('/login');
        // }
        // common token for all API calls
        req = req.clone({
            setHeaders: {
              Authorization: `${this.auth.getToken()}`
            }
          });
      
          return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              
                // do stuff with response if you want
              }
          },(err: any) => {
              
            if (err instanceof HttpErrorResponse) {
             // send to login page on api error response
                console.log(err);
                if (err.status === 500 || err.status === 0 ) {
                    this.router.navigateByUrl('/login');
                    // redirect to the login route
                    // or show a modal
                  }
            }
            
          })
          
    }
}