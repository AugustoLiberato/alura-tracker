<!-- Primeiro porção é responsável pelo template, pelo layout HTML -->
<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
              <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "vuex";
import { key } from "@/store";
/**Função que recebe um objeto de configuração */
export default defineComponent({
  name: "FormularioO",
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador
  },
  data () {
    return {
      descricao: '',
      idProjeto: ''
    }
  },
  methods: {
    finalizarTarefa (tempoDecorrido: number) : void {
      this.$emit('aoSalvarTarefa',{
      duracaoEmSegundos: tempoDecorrido,
      descricao: this.descricao,
      projeto: this.projetos.find(proj => proj.id == this.idProjeto)
      
      });
      this.descricao = '';
    },
  },
  setup () {
    //importamos a store usando a chave
    const store = useStore(key);
    return {
      //retornamos os projetos de forma computada
      projetos: computed(() => store.state.projetos)
    }
  }
});
</script>
<style scoped>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>

