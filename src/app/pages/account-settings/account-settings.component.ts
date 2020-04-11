import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  public cambiarColor(tema: string, link: any) {

    this.aplicarCheck(link);

    this.ajustes.aplicarTema(tema);

  }

  public aplicarCheck(link: any) {

    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  public colocarCheck() {

    const selectores: any = document.getElementsByClassName('selector');

    const tema = this.ajustes.ajustes.tema;

    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }

  }

}
