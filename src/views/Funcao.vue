<template>
  <div class="funcao-container">
    <!-- Cabeçalho fixo -->
    <header class="header">
      <img src="@/image/logo.png" alt="Logo" class="logo" />
      <h1 class="title">SAÚDE RENAL</h1>
    </header>

    <!-- Conteúdo principal -->
    <div class="content">
      <h1 class="header-text">Adicionar Conteúdo para Função Renal</h1>

      <!-- Input para upload -->
      <input 
        type="file" 
        @change="onFileChange" 
        accept="video/funcaorenal/*" 
        class="file-input" 
      />

      <!-- Botões -->
      <button 
        @click="uploadVideo" 
        class="upload-button" 
        :disabled="!selectedFile"
      >
        ENVIAR VÍDEO
      </button>

      <!-- Mensagens de status -->
      <p v-if="uploading" class="status-message">Enviando vídeo...</p>
      <p v-if="uploadSuccess" class="success-message">Vídeo enviado com sucesso!</p>
      <p v-if="uploadError" class="error-message">Erro ao enviar o vídeo: {{ uploadError }}</p>

      <!-- Lista de vídeos -->
      <div v-if="videos.length > 0" class="videos-container">
        <h2 class="video-list-header">Vídeos Enviados:</h2>
        <ul class="video-list">
          <li 
            v-for="video in videos" 
            :key="video.name" 
            class="video-item"
          >
            <span>{{ video.name }}</span>
            <div class="button-group">
              <button 
                @click="deleteVideo(video)" 
                class="delete-button"
              >
                DELETAR
              </button>
              <button 
                @click="selectVideoForUpdate(video)" 
                class="update-button"
              >
                ATUALIZAR
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Input oculto para selecionar novo vídeo -->
    <input 
      type="file" 
      ref="updateFileInput" 
      @change="updateVideo" 
      accept="video/funcaorenal/*" 
      style="display: none;" 
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { getStorage, ref as storageRef, uploadBytes, listAll, deleteObject } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDRse6UVu8Ki6BVw86RbdcwXEbL5muJehk",
  authDomain: "tccapp-64309.firebaseapp.com",
  projectId: "tccapp-64309",
  storageBucket: "tccapp-64309.appspot.com",
  messagingSenderId: "832883484186",
  appId: "1:832883484186:web:ca8b02af43e591c3a413a3",
  measurementId: "G-JY220DLYBF"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default {
  name: 'FuncaoRenal',
  setup() {
    const selectedFile = ref(null);
    const uploading = ref(false);
    const uploadError = ref(null);
    const uploadSuccess = ref(false);
    const videos = ref([]);
    const selectedVideo = ref(null);
    const updateFileInput = ref(null);

    const onFileChange = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const uploadVideo = async () => {
      if (!selectedFile.value) return;

      const storageReference = storageRef(storage, `videos/funcaorenal/${selectedFile.value.name}`);
      uploading.value = true;
      uploadError.value = null;
      uploadSuccess.value = false;

      try {
        await uploadBytes(storageReference, selectedFile.value);
        uploadSuccess.value = true;
        fetchVideos(); // Atualiza a lista de vídeos após o upload
      } catch (error) {
        uploadError.value = error.message;
      } finally {
        uploading.value = false;
        selectedFile.value = null;
      }
    };

    const fetchVideos = async () => {
      const storageRefVideos = storageRef(storage, 'videos/funcaorenal');
      try {
        const result = await listAll(storageRefVideos);
        videos.value = result.items.map(item => ({ name: item.name, ref: item }));
      } catch (error) {
        console.error("Erro ao listar vídeos: ", error);
      }
    };

    const deleteVideo = async (video) => {
      try {
        await deleteObject(video.ref);
        fetchVideos();
      } catch (error) {
        console.error("Erro ao apagar vídeo: ", error);
      }
    };

    const selectVideoForUpdate = (video) => {
      selectedVideo.value = video;
      updateFileInput.value.click(); // Abre o seletor de arquivo para o usuário
    };

    const updateVideo = async (event) => {
      const newFile = event.target.files[0];
      if (!selectedVideo.value || !newFile) return;

      try {
        // Deleta o vídeo selecionado
        await deleteObject(selectedVideo.value.ref);

        // Faz upload do novo vídeo
        const storageReference = storageRef(storage, `videos/funcaorenal/${newFile.name}`);
        await uploadBytes(storageReference, newFile);

        // Mensagem de sucesso e atualiza lista
        alert('Vídeo atualizado com sucesso!');
        fetchVideos();
      } catch (error) {
        console.error("Erro ao atualizar o vídeo: ", error);
      } finally {
        selectedVideo.value = null; // Limpa a seleção
      }
    };

    return {
      selectedFile,
      uploading,
      uploadError,
      uploadSuccess,
      videos,
      selectedVideo,
      updateFileInput,
      onFileChange,
      uploadVideo,
      fetchVideos,
      deleteVideo,
      selectVideoForUpdate,
      updateVideo,
    };
  },
  mounted() {
    this.fetchVideos(); // Carrega os vídeos ao montar o componente
  },
};
</script>

<style scoped>
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

/* Contêiner principal */
.funcao-container {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 800px;
  margin: 0 auto;
}

.header-text {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.file-input {
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.upload-button,
.update-button,
.delete-button {
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.3s;
}

.upload-button {
  background-color: #4caf50;
  margin-bottom: 10px;
}

.update-button {
  background-color: #007bff;
}

.delete-button {
  background-color: #f44336;
}

.upload-button:hover {
  background-color: #45a049;
}

.update-button:hover {
  background-color: #0056b3;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.videos-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
}

.video-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.video-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
}

.video-item:hover {
  background-color: #d6d6d6;
}

.button-group {
  display: flex;
  gap: 10px; /* Espaçamento horizontal entre os botões */
  align-items: center;
}

.status-message {
  font-size: 14px;
  color: #333;
  text-align: center;
}

.success-message {
  font-size: 16px;
  color: green;
  text-align: center;
}

.error-message {
  font-size: 16px;
  color: red;
  text-align: center;
}
</style>
