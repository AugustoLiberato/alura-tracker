<template>
  <!-- main : div principal que tem colunas -->
  <main class=" columns is-gapless is-multiline " :class="{ 'modo-escuro': modoEscuroAtivo }">
    
    <!--  coluna que é a barra lateral com um quarto-->
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>

    <!-- coluna com 3 quartos -->
    <div class="column is-three-quarter conteudo">
      <!-- aqui vai a VIEW correspondente -->
       <!-- indicando para o nosso roteador onde ele vai renderizar a nossa visualização  -->
       <router-view></router-view>
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "./components/BarraLateral.vue";

export default defineComponent({
  name: 'App',
  /**Componentes realcionados a esse componente, compondo componentes com outros componentes */
  components: {
    BarraLateral,
  },
  data () {
    return {

      modoEscuroAtivo: false
    }
  },
  methods: {
    trocarTema ( modoEscuroAtivo: boolean ) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>
