import IProjeto from "@/interfaces/IProjeto";
import { Module } from "vuex";
import { Estado } from "@/store";
import {
  ADICIONA_PROJETO,
  ALTERAR_PROJETO,
  EXCLUIR_PROJETO,
  DEFINIR_PROJETOS,
} from "@/store/tipo-mutacoes";
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETO,
  REMOVER_PROJETO,
} from "@/store/tipo-acoes";
import http from "@/http";

//estado desse modulo
export interface EstadoProjeto {
  projetos: IProjeto[];
}

//modulo
export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    //A PROPRIA STORE O PROPRIO VUEX injeto o estado por isso state
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {   
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto; //tipo, é a interface que ele vai implementar

      //dentro do states a gente tem uma lista de projetos
      state.projetos.push(projeto);
    },
    [ALTERAR_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id != id);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
  },
  actions: {
    //---------------------P R O J E T O S-------------------------------------------------
    [OBTER_PROJETOS]({ commit }) {
      //requisição http (geralmente com axios) para pegar dados do servidos(Uma API)
      //faz uma requisição get para o endpoint /projetos do backend
      http
        .get("projetos")
        //CHAMA A mutation DEFINIR_PROJETOS, passando como payload os dados da respota
        //Chame a mutation DEFINIR_PROJETOS, e passe os dados( resposta.data) para ela
        .then((resposta) => commit(DEFINIR_PROJETOS, resposta.data));
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post("/projetos", {
        nome: nomeDoProjeto,
      });
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return http
        .delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    },

  },

};
