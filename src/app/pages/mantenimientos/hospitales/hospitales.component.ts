import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { delay } from 'rxjs/operators';
import { BusquedaService } from '../../../services/busqueda.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(private hospialService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedaService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }


  private cargarHospitales() {
    this.cargando = false;

    this.hospialService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }

  public guardarCambios(hospital: Hospital) {
    this.hospialService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  public eliminarHospital(hospital: Hospital) {
    this.hospialService.borrarHospital(hospital._id)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      });
  }

  public async abrirSwal() {
    const { value = '' } = await Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

    if (value.length) {
      this.hospialService.crearHospital(value)
        .subscribe((resp: any) => {
          console.log('resp', resp);
          this.hospitales.push(resp.hospital);
        });
    }
  }

  public abrirModal(hospital: Hospital) {

    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

  public buscar(termino: string) {
    if (!termino.length) {
      this.cargarHospitales();
      return;
    }

    this.busquedaService.buscar('hospitales', termino).subscribe((resultados) => {
      this.hospitales = resultados;
    });
  }
}
