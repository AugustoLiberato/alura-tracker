<template>
  <section >
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
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import {  defineComponent } from "vue";
import { ALTERAR_PROJETO, ADICIONA_PROJETO } from "@/store/tipo-mutacoes"
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { notificacaoMixin } from "@/mixins/notificar";
export default defineComponent({
  name: "FormularioO",
  props: {
    id: {
      type: String
    }
  },
  mixins: [notificacaoMixin],
  mounted () {
    if(this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
      console.log(projeto)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data() {
    return { 
      nomeDoProjeto: "",
    };
  },
  methods: {
    salvar() {
      if(this.id) {
        this.store.commit(ALTERAR_PROJETO,{
          id: this.id,
          nome: this.nomeDoProjeto
        });
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
      }
      this.nomeDoProjeto = "";
      this.notificar(TipoNotificacao.ATENCAO, 'Excelent!', 'O projeto foi cadastrado com sucesso!!')
      this.$router.push('/projetos');
    },

  },
  //metodo, lista de projetos
  setup () {
    const store = useStore()
    return {
      store
    }
  }

});
</script>

