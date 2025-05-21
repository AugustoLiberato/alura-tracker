import IProjeto from "@/interfaces/IProjeto.js";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

//a dona dos projetos e a nossa estore e o vuex, ele sabe ccomo adicionar e ninguem mais
export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    //tambem é um objeto, recebe funções que vão adicionar coisas ao estado, primeira mutação é ADICIONA_PROJETO
    mutations: {
        //A PROPRIA STORE O PROPRIO VUEX injeto o estado por isso state
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjeto;//tipo, é a interface que ele vai implementar

            //dentro do states a gente tem uma lista de projetos
            state.projetos.push(projeto);
        },
        [ALTERAR_PROJETO] (state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        // [NOTIFICAR] (state, novaNotificacao: INotificacao) {

        //     novaNotificacao.id = new Date().getTime();
        //     state.notificacoes.push(novaNotificacao);

        // },
        [NOTIFICAR](state, novaNotificacao: INotificacao){

            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
               state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000);
        }
    },
});
//forma nossa de fazer o uso da store, vai retornam uma Store<do nosso estado> que é o nosso store que tem a lista de projetos
export function useStore(): Store<Estado> { 
    //não precisa receber a chave por parametro
    //retornar o useTore do vuex passando a key
    return vuexUseStore(key);
}
