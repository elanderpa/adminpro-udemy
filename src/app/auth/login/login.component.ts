import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public forma: FormGroup;
  public auth2: any;

  constructor(public router: Router, private usuarioService: UsuarioService, private ngZone: NgZone) { }

  ngOnInit() {
    init_plugins();
    this.renderButton();

    this.forma = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      remember: new FormControl(null)
    });

    this.forma.setValue({
      email: localStorage.getItem('email') || '',
      password: '',
      remember: localStorage.getItem('email') || false
    });
  }

  public ingresar() {
    this.usuarioService.login(this.forma.value).subscribe(res => {
      console.log('res', res);
      console.log(this.forma.get('remember').value);
      if (this.forma.get('remember').value) {
        localStorage.setItem('email', this.forma.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
      console.log('dash');
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.mensaje, 'error');
    });
  }

  renderButton() {
    console.log('render');
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();

  }

  async startApp() {

    await this.usuarioService.googleInit();

    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));

  }

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(resp => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
