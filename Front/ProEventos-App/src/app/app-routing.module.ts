import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {
    path:'eventos', component: EventosComponent,
    children:[
      {path:'detalhe/:id', component: EventoDetalheComponent},
      {path:'detalhe', component: EventoDetalheComponent},
      {path:'lista', component: EventoListaComponent},
    ]
  },
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
