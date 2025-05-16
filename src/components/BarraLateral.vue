<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Alura Tracker">
        </h1>
        <div class="has-text-centered">
        <button class="button" @click="alterarTema"> Ativar modo {{ textoBotao }} </button>
        </div>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <router-link to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        tarefas
                    </router-link>
                </li>

    <li>
        <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
                Projetos
                </router-link>
            </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
/*importar a função*/
import { defineComponent } from 'vue'

/**Exportar a função que define esse componente */
export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoTemaAlterado'],
    data () {
        return {
            modoEscuroAtivo: false
        }
    },
    computed: {
        textoBotao () {
            if(this.modoEscuroAtivo) {
                return 'claro'
            }
            return 'escuro'
        }
    },
    methods: {
        alterarTema() {
            this.modoEscuroAtivo = !this.modoEscuroAtivo;
            this.$emit('aoTemaAlterado', this.modoEscuroAtivo);
        }
    }
})
</script>

<style scoped>
/**todo o estilo do componente */
h1 {
    text-align: center;
}
strong {
    color: #f95728;
}
header{
    background: #0d3b66; 
    width: 100%;
    height: 100vh;
    padding: 1rem;
}
@media only screen and (max-width: 768px) {
    header{
        height: auto;
    }
}
.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
</style>

