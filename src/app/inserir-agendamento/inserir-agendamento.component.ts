import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Agendamento } from '../model/agendamento';
import { Endereco } from '../model/endereco';
import { AgendamentoService } from '../services/agendamento.service';
import { ViaCepService } from '../services/viacep/via-cep.service';
import { EnderecoService } from '../services/endereco/endereco.service';

@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agendamento.component.html',
  styleUrls: ['./inserir-agendamento.component.css']
})
export class InserirAgendamentoComponent implements OnInit {

  agendamento: Agendamento = new Agendamento();

  constructor(
    private agendamentoService: AgendamentoService,
    private enderecoService: EnderecoService, // Injetar o serviço de endereço
    private router: Router,
    private viaCepService: ViaCepService
  ) {}

  ngOnInit(): void {
    this.agendamento.endereco = new Endereco();
  }

  buscarCep() {
    const cep = this.agendamento.endereco.cep ? this.agendamento.endereco.cep.replace(/\D/g, '') : '';
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
    // Certifique-se de validar os campos obrigatórios antes de enviar
    if (!this.agendamento.titulo_do_servico || !this.agendamento.telefone || !this.agendamento.email) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    // Cadastro do endereço
    this.enderecoService.cadastrar(this.agendamento.endereco).subscribe(
      (enderecoResponse) => {
        if (enderecoResponse && enderecoResponse.codigo) {
          // Atualizar o ID do endereço no agendamento
          this.agendamento.endereco.codigo = enderecoResponse.codigo;

          // Enviar o agendamento com o endereço associado
          this.agendamentoService.incluirAgendamento(this.agendamento).subscribe(
            (response) => {
              console.log('Agendamento salvo com sucesso', response);
              this.router.navigate(['/agendamentos']);
            },
            (error) => {
              console.error('Erro ao salvar agendamento', error);
            }
          );
        } else {
          console.error('Erro ao cadastrar endereço: resposta inválida', enderecoResponse);
        }
      },
      (error) => {
        console.error('Erro ao cadastrar endereço', error);
      }
    );
  }
}
