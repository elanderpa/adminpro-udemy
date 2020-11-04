import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
})
export class HeaderComponent implements OnInit {

    public usuario: Usuario;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router) {
        this.usuario = this.usuarioService.usuario;
    }

    ngOnInit() {

    }

    public logout() {
        this.usuarioService.logout();
    }

    public buscar(termino: string) {

        if (!termino.length) {
            console.log('in');
            return;

        }


        this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
    }

}
