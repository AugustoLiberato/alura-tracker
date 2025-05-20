<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import IProjeto from "../interfaces/IProjeto.js";
export default defineComponent({
  name: "ProjetosS",
  data() {
    return {
      // estado local que esta vinculado ao input
      nomeDoProjeto: "",
     // projetos: [] as IProjeto[], estado global
    };
  },
  methods: {
    salvar() {
      //AO INVES DE USAR ISSO
      // const projeto: IProjeto = {
      //   // quando o usuario submet pega-se o input e coloca no nome do projeto
      //   nome: this.nomeDoProjeto,
      //   id: new Date().toISOString(),
      // };
      // this.projetos.push(projeto);
      //USA O MODELO ABAIXO

      //METODO COmmit para chamar uma mutação tem 2 parametros(nome mutation, nome do projeto em si)
      this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
      this.nomeDoProjeto = "";
    },
  },
  //metodo, lista de projetos
  setup () {
    const store = useStore()
    return {
      store,
      projetos: computed(() => store.state.projetos)
    }
  }

});
</script>
<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
