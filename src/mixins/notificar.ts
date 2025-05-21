import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from  "@/store/tipo-mutacoes";
import { store } from "@/store/index";

export const notificacaoMixin = {
methods: {
            notificar(tipo : TipoNotificacao, titulo: string, texto: string) : void  {
            //metodo faz o commit da notificação
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            });
        }
    }
}

