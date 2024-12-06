<template>
  <div class="conteudos-container">
    <!-- Cabeçalho fixo com título -->
    <header class="header">
      <img src="@/image/logo.png" alt="Logo" class="logo" />
      <h1 class="title">SAÚDE RENAL</h1>
    </header>

    <!-- Conteúdo principal -->
    <div class="content-container">
      <h2 class="sub-header-text">MENU</h2>
      <p class="description">
        Clique no conteúdo abaixo no qual deseja inserir conteúdo
      </p>

      <!-- Contêiner de rolagem com opções -->
      <div class="scroll-container">
        <router-link to="/anatomia" class="option-box">
          <span class="option-text">Anatomia Renal</span>
        </router-link>
        <router-link to="/fisiologia" class="option-box">
          <span class="option-text">Fisiologia Renal</span>
        </router-link>
        <router-link to="/funcao" class="option-box">
          <span class="option-text">Função Renal</span>
        </router-link>
        <router-link to="/sintomas" class="option-box">
          <span class="option-text">Sintomas da DRC</span>
        </router-link>
        <router-link to="/prevencao" class="option-box">
          <span class="option-text">Prevenção da DRC</span>
        </router-link>
        <router-link to="/cuidados-transplantado" class="option-box">
          <span class="option-text">Cuidados ao Paciente Transplantado</span>
        </router-link>
        <router-link to="/cuidados-dialise" class="option-box">
          <span class="option-text">Cuidados ao Paciente em Diálise</span>
        </router-link>
        <router-link to="/curiosidades" class="option-box">
          <span class="option-text">Curiosidades</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Conteudos",
};
</script>

<style scoped>
/* Estilos gerais */
html,
body {
  height: 100%;
  margin: 0;
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;
}

/* Cabeçalho fixo */
.header {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 50px;
  margin-right: 10px;
}

.title {
  font-size: 24px;
  color: #3f51b5;
  font-weight: bold;
}

/* Container principal */
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  padding-top: 80px; /* Espaço para o cabeçalho */
  box-sizing: border-box;
}

/* Texto do cabeçalho */
.sub-header-text {
  font-size: 24px;
  color: #3f51b5;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
}

/* Contêiner de rolagem */
.scroll-container {
  width: 100%;
  max-width: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}

/* Caixas de opção */
.option-box {
  width: 100%; /* Largura total */
  max-width: 400px; /* Limita a largura das caixas */
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3f51b5; /* Cor de fundo azul */
  border-radius: 6px;
  margin-bottom: 15px;
  text-decoration: none; /* Remove o sublinhado */
  transition: background-color 0.3s ease;
}

.option-box:hover {
  background-color: #1e88e5; /* Cor mais escura ao passar o mouse */
}

.option-text {
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
}

/* Responsividade */
@media (max-width: 768px) {
  .content-container {
    padding: 20px;
  }

  .option-box {
    max-width: 100%;
  }
}
</style>
