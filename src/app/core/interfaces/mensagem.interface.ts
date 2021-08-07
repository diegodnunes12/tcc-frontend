import { UsuarioInterface } from './usuarios.interface';

export interface MensagemInterface {
  texto: string;
  data_mensagem: Date;
  usuario: string;
  contato: string;
}

