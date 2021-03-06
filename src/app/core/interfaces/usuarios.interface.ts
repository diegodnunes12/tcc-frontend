import { TipoUsuarioInterface } from './tipo-usuario.interface';

export interface UsuarioInterface {
  _id?: string;
  nome?: string;
  cpf?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  tipo_usuario?: TipoUsuarioInterface;
  ong?: string;
  data_cadastro?: Date;
}
