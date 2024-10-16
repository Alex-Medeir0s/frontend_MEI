import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from '../model/servico';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-inserir-servico',
  templateUrl: './inserir-servico.component.html',
  styleUrls: ['./inserir-servico.component.css']
})
export class InserirServicoComponent implements OnInit {

  servico: Servico = new Servico();
  // pessoas!: Pessoa[];

  // constructor( private EquipamentoService: EquipamentoService, private PessoaService: PessoaService, private router: Router) { }
  constructor( private ServicoService: ServicoService, private router: Router) { }

  ngOnInit(): void {

    // this.listarPessoas();

  }

  // private listarPessoas(){
  //   this.PessoaService.listarPessoas().subscribe(data => {
  //     this.pessoas = data;
  //   });
  // }



  onSubmit(){
    this.InserirServico();
  }

  InserirServico(){
    this.servico.codigo = 0;
    this.ServicoService.incluirServico(this.servico).subscribe(data => {
      console.log(data);
      this.listarServicos();
    })
  }

  listarServicos(){
    this.router.navigate(['listar-servicos']);
  }
}
