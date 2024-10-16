import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

import { ListarAgendasComponent } from './listar-agendas/listar-agendas.component';
import { AlterarAgendamentoComponent } from './alterar-agendamento/alterar-agendamento.component';
import { InserirAgendamentoComponent } from './inserir-agendamento/inserir-agendamento.component';

import { ListarServicosComponent } from './listar-servico/listar-servico.component';
import { AlterarServicoComponent } from './alterar-servico/alterar-servico.component';
import { InserirServicoComponent } from './inserir-servico/inserir-servico.component';

const routes: Routes = [

  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  
  {path: 'listar-agendas', component: ListarAgendasComponent},
  {path: 'inserir-agendamento', component: InserirAgendamentoComponent},
  {path: 'alterar-agendamento/:codigo', component: AlterarAgendamentoComponent},
  
  {path: 'listar-servicos', component: ListarServicosComponent},
  {path: 'inserir-servico', component: InserirServicoComponent},
  {path: 'alterar-servico/:codigo', component: AlterarServicoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
