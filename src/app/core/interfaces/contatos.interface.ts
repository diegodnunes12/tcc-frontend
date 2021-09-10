export interface ContatosInterface {
  _id?: string;
  data_contato: Date;
  animal: {
    _id: string;
    nome: string;
    sexo: string;
    especie: {
      _id: string;
      nome: string;
    };
    porte: {
      _id: string;
      nome: string;
    };
  };
  usuario: {
    _id: string;
    nome: string;
  };
  ong: string;
}
