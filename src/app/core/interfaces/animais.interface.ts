import { PorteInterface } from './porte.interface';
import { EspecieInterface } from './especie.interface';
import { OngInterface } from './ong.interface';

export interface AnimaisInterface {
  _id?: string;
  nome: string;
  pelagem?: string;
  sexo?: string;
  raca?: string;
  idade?: string;
  historia?: string;
  castrado?: boolean;
  vacinado?: boolean;
  vermifugado?: boolean;
  ong?: OngInterface;
  especie: EspecieInterface;
  porte: PorteInterface;
  imagem?: string;
  data_cadastro?: Date;
}
