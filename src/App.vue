<template>
  <div id="app">
    <router-view></router-view> <!-- Renderiza as rotas -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Estilos globais */
html, body {
  height: 100%;
  margin: 0; /* Remove margens padrão */
  padding: 0; /* Remove preenchimento padrão */
  overflow: hidden; /* Impede rolagem e mantém o layout fixo */
  background-color: #f9f9f9; /* Cor de fundo suave e neutra */
  font-family: 'Helvetica Neue', Arial, sans-serif; /* Fonte moderna */
}

#app {
  height: 100vh; /* Garante que o app ocupe 100% da altura da viewport */
  width: 100vw; /* Garante que o app ocupe 100% da largura da viewport */
  display: flex; /* Flexbox para facilitar o alinhamento */
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza o conteúdo verticalmente */
  font-family: 'Helvetica Neue', Arial, sans-serif; /* Fonte limpa e moderna */
  text-align: center;
  color: #333333; /* Cor de texto escura */
  background-color: #ffffff; /* Cor de fundo branco */
}

@media (max-width: 480px) {
  #app {
    padding: 0 15px; /* Pequeno padding em telas menores para evitar que o conteúdo fique muito colado às bordas */
  }
}
</style>
