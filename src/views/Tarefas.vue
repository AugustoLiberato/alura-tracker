<template> 
    <Formulario @aoSalvarTarefa="salvarTarefa"  />
    <div class="lista">
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje :(
        </Box>
        <Tarefa v-for="(  tarefa, index ) in tarefas" :key="index" :tarefa="tarefa  "/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa.js";
import Box from "../components/Box.vue";

export default defineComponent({
  name: 'App',
  /**Componentes realcionados a esse componente, compondo componentes com outros componentes */
  components: {
    Formulario,
    Tarefa,
    Box
  },
  data () {
    return {
      tarefas: [] as ITarefa[],
      
    }
  },
  computed: {
    listaEstaVazia () : boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    }
  }
});
</script>
    


