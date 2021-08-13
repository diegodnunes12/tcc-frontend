export interface MensagemInterface {
  texto: string;
  data_mensagem: Date;
  usuario: {
    _id: string;
    nome: string;
  };
  contato: string;
}

