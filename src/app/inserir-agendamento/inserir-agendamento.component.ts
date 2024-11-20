import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Agendamento } from '../model/agendamento';
import { Endereco } from '../model/endereco';
import { AgendamentoService } from '../services/agendamento.service';
import { ViaCepService } from '../services/viacep/via-cep.service';

@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agendamento.component.html',
  styleUrls: ['./inserir-agendamento.component.css']
})
export class InserirAgendamentoComponent implements OnInit {

  agendamento: Agendamento = new Agendamento();
  
  constructor(
    private agendamentoService: AgendamentoService, 
    private router: Router, 
    private viaCepService: ViaCepService
  ) {}

  ngOnInit(): void {
    this.agendamento.endereco = new Endereco();
  }

  buscarCep() {
    const cep = this.agendamento.endereco.cep ? this.agendamento.endereco.cep.replace(/\D/g, '') : ''; // Remove caracteres não numéricos
    if (cep.length === 8) {
      this.viaCepService.buscarCep(cep).subscribe(
        (data) => {
          if (data.erro) {
            alert('CEP não encontrado.');
          } else {
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
    } else {
      alert('CEP inválido.');
    }
  }

  retornar() {
    this.router.navigate(['listar-agendas']);
  }

  onSubmit() {
    this.agendamento.codigo = 0;
    this.agendamentoService.incluirAgendamento(this.agendamento).subscribe(
      (data) => {
        console.log(data);
        this.retornar();
      },
      (error) => {
        console.error('Erro ao incluir agendamento:', error);
      }
    );
  }
}
