import { UsuarioInterface } from './usuarios.interface';

export interface MensagemInterface {
  texto: string;
  dataMensagem: Date;
  usuario: UsuarioInterface;
  contato: string;
}

