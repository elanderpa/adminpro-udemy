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
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }  },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }  },

      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación' }  },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
