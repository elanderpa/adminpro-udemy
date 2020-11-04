import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private busquedaService: BusquedaService,
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({termino}) => {
      this.busquedaGlobal(termino)
    });
  }

  public busquedaGlobal(termino: string) {
    this.busquedaService.busquedaGlobal(termino)
    .subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;

    });
  }

  public abrirMedico(medico: Medico) {
    this.router.navigateByUrl(`dashboard/medico/${medico._id}`);
  }

}
