
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { tarefa, EstadoTarefa } from "./modulos/tarefa";
import { NOTIFICAR } from "@/store/tipo-mutacoes"

export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa,
}

export const key: InjectionKey<Store<Estado>> = Symbol();

//a dona dos projetos e a nossa estore e o vuex, ele sabe ccomo adicionar e ninguem mais
export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        }
    },
    mutations: {
      [NOTIFICAR](state, novaNotificacao: INotificacao){

            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
               state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000);
        }
    },
   
    modules: {
        projeto,
        tarefa
    }
 
  
});
//forma nossa de fazer o uso da store, vai retornam uma Store<do nosso estado> que é o nosso store que tem a lista de projetos
export function useStore(): Store<Estado> { 
    //não precisa receber a chave por parametro
    //retornar o useTore do vuex passando a key
    return vuexUseStore(key);
}


