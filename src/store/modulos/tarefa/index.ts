import ITarefa from "@/interfaces/ITarefa";
import { Module } from "vuex";
import { Estado } from "@/store/index";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from "@/store/tipo-mutacoes";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-acoes";
import http from "@/http";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: [],
    },
    //adicionar coisas a um estado
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id);
            state.tarefas[index] = tarefa;
        },
},

    actions: {
        [OBTER_TAREFAS]( { commit }, filtro: string ) {
            let url = 'tarefas'

            if (filtro) {
                url += '?descricao=' + filtro
            }

            http.get(url)
                .then(response => commit(DEFINIR_TAREFAS, response.data));
        },

        [CADASTRAR_TAREFA]( { commit }, tarefa: ITarefa ) {
            return http.post('/tarefas', tarefa)
                .then(resposta => commit( ADICIONA_TAREFA, resposta.data ));
        },

        [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
    },
}
