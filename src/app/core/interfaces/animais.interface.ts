import { PorteInterface } from './porte.interface';
import { EspecieInterface } from './especie.interface';
import { OngInterface } from './ong.interface';

export interface AnimaisInterface {
  id?: string;
  nome: string;
  pelagem?: string;
  sexo?: string;
  raca?: string;
  historia?: string;
  castrado?: boolean;
  vacinado?: boolean;
  vermifugado?: boolean;
  ong: OngInterface;
  especie: EspecieInterface;
  porte: PorteInterface;
  data_cadastro: Date;
}
