import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'eventos', component: EventosComponent},
  {path:'palestrantes', component: PalestrantesComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'**', redirectTo:'dashboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
