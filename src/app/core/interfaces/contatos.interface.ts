import { OngInterface } from './ong.interface';
import { UsuarioInterface } from './usuarios.interface';
import { AnimaisInterface } from './animais.interface';

export interface ContatosInterface {
  _id?: string;
  data_contato: Date;
  animal: string;
  usuario: {
    _id: string;
    nome: string;
  };
  ong: string;
}
