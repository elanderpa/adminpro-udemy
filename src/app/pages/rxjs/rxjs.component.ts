import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino')
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<object> {
    let contador = 0;
    const obs = new Observable<object>(observer => {


      const intervalo = setInterval(() => {

        contador++;


        const salida = {
          valor: contador
        }


        observer.next(salida);
        /* if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */

      }, 1000);

    }).pipe(
      map((resp: any) => resp.valor),
      filter((valor, index) => {

        if ((valor % 2) === 1) {
          // impar
          return true;
        } else {
          return false;
        }
      })
    );

    return obs;
  }

}
