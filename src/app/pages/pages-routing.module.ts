import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }  },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' }  },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' }  },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda' }  },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }  },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }  },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' }  },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' }  },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de Medico' }  },


      // Rutas de admin
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Manteminiemto de Usuario' }  },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
