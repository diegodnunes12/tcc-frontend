export interface CampanhasInterface {
  _id?: string;
  nome: string;
  descricao: string;
  valor: number;
  ativo: boolean;
  chave_pix: string;
  ong?: string;
}
