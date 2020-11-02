import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { delay } from 'rxjs/internal/operators/delay';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {


  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription;

  constructor(private medicosService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedaService) { console.log(this.medicos.length); }

  ngOnInit() {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(200))
      .subscribe((img) => this.cargarMedicos());
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  public cargarMedicos() {
    console.log('cargar');
    this.cargando = true;
    this.medicosService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
      });
  }

  public abrirModal(medico: Medico) {

    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);

  }

  public buscar(termino: string) {
    if (!termino.length) {
      this.cargarMedicos();
      return;
    }

    this.busquedaService.buscar('medicos', termino).subscribe((resultados) => {
      this.medicos = resultados;
    });
  }

  public borrarMedico(medico: Medico) {

    Swal.fire({
      title: 'Borrar medico?',
      text: `Esta apunto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si Borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.borrarMedico(medico._id).subscribe((res) => {
          this.cargarMedicos();
          Swal.fire(
            'Medico borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });

  }

}
