import { EnderecoService } from './../services/endereco/endereco.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Agendamento } from '../model/agendamento';
import { AgendamentoService } from '../services/agendamento.service';
import { ViaCepService } from '../services/viacep/via-cep.service';


@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agendamento.component.html',
  styleUrls: ['./inserir-agendamento.component.css']
})
export class InserirAgendamentoComponent {

  codigo!: number;
  agendamento: Agendamento = new Agendamento();
  
  constructor(private AgendamentoService: AgendamentoService, private EnderecoService: EnderecoService , private router: Router,  private ViaCepService: ViaCepService) { }

  ngOnInit(): void {

  }

  buscarCep() {
    const cep = this.agendamento.endereco.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      this.ViaCepService.buscarCep(cep).subscribe(
        (data) => {
          if (data.erro) {
            alert('CEP não encontrado.');
          } else {
            // Preenche os campos do endereço com os dados retornados
            this.agendamento.endereco.logradouro = data.logradouro;
            this.agendamento.endereco.cidade = data.localidade;
            this.agendamento.endereco.uf = data.uf;
            this.agendamento.endereco.bairro = data.bairro;
          }
        },
        (error) => {
          console.error('Erro ao buscar CEP:', error);
        }
      );
    }
  }


  retornar() {
    this.router.navigate(['listar-agendas']);
  }

  onSubmit(){
    this.agendamento.codigo = 0;
    this.AgendamentoService.incluirAgendamento(this.agendamento).subscribe( data => {
      console.log(data);
      this.retornar();
    });
  }


}
