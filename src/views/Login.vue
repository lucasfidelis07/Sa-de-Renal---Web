<template>
  <div class="main-container">
    <!-- Cabeçalho fixo com fundo branco -->
    <header class="header">
      <img src="@/image/logo.png" alt="Logo" class="logo" />
      <h1 class="title">SAÚDE RENAL</h1>
    </header>

    <!-- Container principal com o fundo branco mais escuro -->
    <div class="content-container">
      <div class="login-container">
        <div class="form-area">
          <h2 class="subtitle">Área de Login</h2>
          <form @submit.prevent="handleLogin" class="form">
            <div class="input-group">
              <label for="email">E-mail:</label>
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="Digite seu e-mail"
                required
                class="input"
              />
            </div>
            <div class="input-group">
              <label for="password">Senha:</label>
              <input
                id="password"
                type="password"
                v-model="password"
                placeholder="Digite sua senha"
                required
                class="input"
              />
            </div>
            <button type="submit" class="button">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const handleLogin = async () => {
      if (!email.value || !password.value) {
        alert("Por favor, insira o e-mail e a senha.");
        return;
      }
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        alert("Login realizado com sucesso!");
        window.location.href = "/conteudos";
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          alert("E-mail não encontrado.");
        } else if (error.code === "auth/wrong-password") {
          alert("Senha incorreta.");
        } else {
          alert(`Erro ao fazer login: ${error.message}`);
        }
      }
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* Estilos gerais */
html,
body {
  height: 100%;
  margin: 0;
  font-family: "Roboto", sans-serif;
}

/* Cabeçalho fixo */
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff; /* Fundo branco */
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
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff; 
  padding-top: 80px;
  box-sizing: border-box;
}

/* Layout de login */
.login-container {
  display: flex;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
}

/* Área do formulário */
.form-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.subtitle {
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
}

.input {
  width: 100%; 
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
}

.input:focus {
  border-color: #3f51b5;
  outline: none;
}

.button {
  width: 100%; /* Botão também esticado */
  padding: 12px 15px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #1e88e5;
}
</style>
