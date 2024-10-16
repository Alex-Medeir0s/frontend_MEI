import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from '../model/servico';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-alterar-servico',
  templateUrl: './alterar-servico.component.html',
  styleUrls: ['./alterar-servico.component.css']
})
export class AlterarServicoComponent implements OnInit {

  codigo!: number;
  servico!: Servico; 
  // pessoas!: Pessoa[];

  // constructor(private equipamentoService: EquipamentoService, private pessoaService: PessoaService,
  //   private router: Router,
  //   private route: ActivatedRoute) { }

  constructor(private servicoService: ServicoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.codigo = this.route.snapshot.params['codigo'];
    this.servico = new Servico();
    // this.servico.pessoa = new Pessoa();
    this.servicoService.consultarServico(this.codigo).subscribe( data => { 
      this.servico = data;
    });

    // this.ListarPessoas();
  }

  onSubmit(){
    this.servicoService.alterarServico(this.codigo, this.servico).subscribe( data => {
      this.listarServicos();
    })
  }

  // private ListarPessoas(){
  //   this.pessoaService.listarPessoas().subscribe(data => {
  //     this.pessoas = data;
  //   });
  // }

  listarServicos(){
    this.router.navigate(['listar-servicos']);
  }
}
