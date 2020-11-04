import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/shared/sidebar.service';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private sideBarService: SidebarService) { }

  ngOnInit() {
    init_plugins();
    this.sideBarService.cargarMenu();
  }

}
