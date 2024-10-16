import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from '../model/servico';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-listar-servico',
  templateUrl: './listar-servico.component.html',
  styleUrls: ['./listar-servico.component.css']
})
export class ListarServicosComponent implements OnInit {


  servicos!: Servico[];

  constructor(private ServicoService: ServicoService, private router: Router) { }

  ngOnInit(): void {

    this.listarServicos();

  }
  private listarServicos() {
    this.ServicoService.listarServicos().subscribe(data => {
      this.servicos = data;

    });
  }

  excluirServico(codigo: number) {
    if (confirm("Deseja excluir o Serviço?")) {
      this.ServicoService.excluirServico(codigo).subscribe(data => {
        console.log(data);
        this.listarServicos();
      })
    }
  }
  
  inserirServico() {
    this.router.navigate(['inserir-servico'])
  }

  alterarServico(codigo: number) {
    this.router.navigate(['alterar-servico', codigo])
  }
  Retornar() {
    this.router.navigate(['inicio'])
  }
}
