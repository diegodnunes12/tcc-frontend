import { OngInterface } from './ong.interface';
import { UsuarioInterface } from './usuarios.interface';
import { AnimaisInterface } from './animais.interface';

export interface ContatosInterface {
  dataContato: Date;
  animal: AnimaisInterface;
  usuario: UsuarioInterface;
  ong: OngInterface;
}
