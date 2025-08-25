import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthResponseData, User} from '../shared/models/models';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {login, logout} from '../store/auth.actions';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private store = inject(Store);
  private http = inject(HttpClient);
  private url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`;
  user = signal<User | null>(null);


  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.url,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
          const user = new User(resData.email, resData.localId, resData.idToken, new Date(expirationDate));
          localStorage.setItem("auth", JSON.stringify(user));
          this.store.dispatch(login({user}));
        })
      )
  }

  logout(){
    this.user.set(null);
    localStorage.removeItem('auth');
    this.store.dispatch(logout());
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.set(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes)
    let errorMessage = 'An error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Invalid Email';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid credentials';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid credentials';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
