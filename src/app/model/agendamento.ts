import { Endereco } from "./endereco";
export class Agendamento {
    codigo!: number;
    titulo_do_servico!: string;
    telefone!: string;
    email!: string;
    data_e_hora_inicio!: string;
    data_e_hora_fim!: string;
    observacao!: string;
    cliente!: string;
    endereco!: Endereco;

}
