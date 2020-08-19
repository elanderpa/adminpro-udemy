import { Injectable, NgZone } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, tap, catchError } from 'rxjs/operators/';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interface/login-form.interface';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { resolve } from 'url';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  public googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '609263184715-q0r2b549uphfsgsk3nh44bc0tidfi70a.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }



  public logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  public validarToken(): Observable<boolean> {

    const url = `${URL_SERVICIOS}/login/renew`;
    const token = localStorage.getItem('token') || '';

    return this.http.get(url, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        console.log('tap', resp);
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(err => of(false))
    );
  }

  public crearUsuario(usuario: Usuario) {

    const url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire({
            text: `Usuario creado ${usuario.email}`,
            icon: 'success'
          });
          return resp.usuario;
        }));
  }

  public login(formData: LoginForm) {

    const url = `${URL_SERVICIOS}/login`;

    return this.http.post(url, formData).pipe(
      tap((resp: any) => {
        console.log('tap', resp);
        localStorage.setItem('token', resp.token);
      })
    );
  }

  public loginGoogle(token) {

    const url = `${URL_SERVICIOS}/login/google`;
    console.log('tokenseje', token);
    return this.http.post(url, { token }).pipe(
      tap((resp: any) => {
        console.log('tap', resp);
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
