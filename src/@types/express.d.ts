declare namespace Express {
  /**
   * Ele não faz uma substituição, mas um anexo.
   * Ele irá anexar o que eu colocar aqui junto com o que já existe
   * no Request na biblioteca Express
   */
  export interface Request {
    user: {
      id: string;
    };
  }
}
