import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {TokenService} from './token.service';
import * as endpoints from './auth.endpoint';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

const BASE_URL = environment.apiEndPoint;
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  params: {},
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl = '';
  refreshTokenInterval: any;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
  }
  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An Error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Code From Backend: ${error.status}`,
        `Body: ${error.error}`
      );
    }

    return throwError('Internal server error!');
  }

  static log(message: string): any {
    console.log(message);
  }

  login(loginPayload: any): Observable<any> {
    return this.http
      .post(BASE_URL + endpoints.LOGIN, loginPayload, HTTP_OPTIONS)
      .pipe(
        tap((res: any) => {
          AuthService.log('login');
          //this.startRefreshTokenTimer()
        }),
        catchError(AuthService.handleError)
      );
  }

  signUp(signUpPayload: any): Observable<any> {
    return this.http
      .post(BASE_URL + endpoints.REGISTER, signUpPayload, HTTP_OPTIONS)
      .pipe(
        tap((_) => AuthService.log('registered!')),
        catchError(AuthService.handleError)
      );
  }

  refreshToken(refreshTokenData: any): Observable<any> {
    return this.http.post(BASE_URL + endpoints.REFRESH_TOKEN, refreshTokenData, HTTP_OPTIONS).pipe(
      tap((event: any) => {
        // Save new Tokens
        this.tokenService.removeAccessToken();
        this.tokenService.removeRefreshToken();
        this.tokenService.saveAccessToken(event.access_token);
        this.tokenService.saveRefreshToken(event.refresh_token);
        //return event;

      }),
      catchError(AuthService.handleError)
    );
  }

  logOut(): void {
    this.tokenService.removeAccessToken();
    this.tokenService.removeRefreshToken();
    setTimeout(() => {
      clearInterval(this.refreshTokenInterval);
      this.refreshTokenInterval = null;
      this.router.navigate(['/auth/login']);
    }, 1000);
  }

  isAccessTokenExpired(accessToken: any): boolean {
    const decoded: any = jwt_decode(accessToken);
    const expMilSecond: number = decoded?.exp * 1000;
    const currentTime = Date.now() + 60000;
    if ((expMilSecond - currentTime) < 0) {
      clearInterval(this.refreshTokenInterval)
      this.refreshTokenInterval = null
      return true;
    }
    return false;
  }

  getUserData(): any {
    let data: any;
    if (this.tokenService.getAccessToken()) {
      const token = this.tokenService.getAccessToken();
      if (token != null) {
        const decoded: any = jwt_decode(token);
        data = {
          ...decoded.data,
        };
        return data;
      }
    }
    return [];
  }
  isLogin(){
    if (!this.tokenService.getRefreshToken()){
     return false
    }
    else {
      return true;
    }
  }
}
