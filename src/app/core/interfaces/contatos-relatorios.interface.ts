import { OngInterface } from './ong.interface';
import { UsuarioInterface } from './usuarios.interface';
import { AnimaisInterface } from './animais.interface';

export interface ContatosRelatoriosInterface {
  _id?: string;
  data_contato: Date;
  animal: AnimaisInterface;
  usuario: {
    _id: string;
    nome: string;
  };
  ong: OngInterface;
}
