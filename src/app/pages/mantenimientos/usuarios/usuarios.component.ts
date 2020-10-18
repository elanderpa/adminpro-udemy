import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuarioService } from "../../../services/usuario/usuario.service";
import { Usuario } from "src/app/models/usuario.model";
import { BusquedaService } from "../../../services/busqueda.service";
import Swal from "sweetalert2";
import { ModalImagenService } from "../../../services/modal-imagen.service";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe((img) =>
      this.cargarUsuarios()
    );
  }

  public cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  public cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  public buscar(termino: string) {
    if (!termino.length) {
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedaService.buscar("usuarios", termino).subscribe((resultados) => {
      this.usuarios = resultados;
    });
  }

  public eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire("Error", "No puede borrarse a si mismo");
    }

    Swal.fire({
      title: "Borrar usuario?",
      text: `Esta apunto de borrar a ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si Borrarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((res) => {
          this.cargarUsuarios();
          Swal.fire(
            "Usuario borrado",
            `${usuario.nombre} fue eliminado correctamente`,
            "success"
          );
        });
      }
    });
  }

  public cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario).subscribe((resp) => {
      console.log(resp);
    });
  }

  public abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal("usuarios", usuario.uid, usuario.img);
  }
}
