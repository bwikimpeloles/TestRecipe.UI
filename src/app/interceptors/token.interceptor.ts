import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TestRecipeService } from '../services/test-recipe.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private testRecipeService: TestRecipeService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.testRecipeService.getToken();

    if(myToken) { request =
      request.clone({setHeaders: {Authorization: `Bearer ${myToken}`}})
    }

    return next.handle(request).pipe(catchError((err)=>{
      if(err instanceof HttpErrorResponse){
        if (err.status ==401) {
          console.log("token expire.login again");
        }
      }
      return throwError(()=>new Error("some error occured"))
    }));
  }
}
