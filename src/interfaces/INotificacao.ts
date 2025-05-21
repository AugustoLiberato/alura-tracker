export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO
}

export interface INotificacao {
    id: number,
    texto: string,
    titulo: string,
    tipo: TipoNotificacao,
   
}

