<template>
    <div class="curiosidades-container">
      <!-- Cabeçalho fixo -->
      <header class="header">
        <img src="@/image/logo.png" alt="Logo" class="logo" />
        <h1 class="title">SAÚDE RENAL</h1>
      </header>
  
      <!-- Conteúdo principal -->
      <div class="content">
        <h1 class="header-text">Adicionar ou Atualizar Curiosidade</h1>
        <form class="form-container" @submit.prevent="addOrUpdateCuriosity">
          <!-- Input para o título -->
          <input
            v-model="newCuriosity.title"
            type="text"
            class="form-input"
            placeholder="Título"
            required
          />
  
          <!-- Input para a descrição -->
          <textarea
            v-model="newCuriosity.description"
            class="form-input"
            placeholder="Descrição"
            required
          ></textarea>
  
          <!-- Input para a imagem -->
          <input
            type="file"
            @change="handleFileChange"
            class="form-input-file"
            accept="image/*"
          />
  
          <!-- Botões de ação -->
          <button type="submit" class="button green-button">
            {{ editMode ? "ATUALIZAR" : "ADICIONAR" }}
          </button>
          <button
            v-if="editMode"
            type="button"
            class="button cancel-button"
            @click="cancelEdit"
          >
            CANCELAR
          </button>
        </form>
  
        <!-- Lista de curiosidades -->
        <div class="curiosities-list">
          <h2 class="header-text">Curiosidades</h2>
          <div v-if="loading" class="uploading-message">Carregando...</div>
          <ul class="curiosity-list" v-else>
            <li
              v-for="(curiosity, index) in curiosities"
              :key="curiosity.key"
              class="curiosity-item"
            >
              <img
                :src="curiosity.image"
                alt="Curiosidade"
                class="curiosity-image"
              />
              <div class="curiosity-info">
                <h3>{{ curiosity.title }}</h3>
                <p>{{ curiosity.description }}</p>
              </div>
              <button
                class="button blue-button"
                @click="editCuriosity(curiosity)"
              >
                EDITAR
              </button>
              <button
                class="button red-button"
                @click="deleteCuriosity(curiosity.key, curiosity.imagePath)"
              >
                APAGAR
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { initializeApp } from "firebase/app";
  import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage";
  import { getDatabase, ref as dbRef, push, onValue, update, remove } from "firebase/database";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDRse6UVu8Ki6BVw86RbdcwXEbL5muJehk",
    authDomain: "tccapp-64309.firebaseapp.com",
    projectId: "tccapp-64309",
    storageBucket: "tccapp-64309.appspot.com",
    messagingSenderId: "832883484186",
    appId: "1:832883484186:web:ca8b02af43e591c3a413a3",
    measurementId: "G-JY220DLYBF",
  };
  
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const database = getDatabase(app);
  
  export default {
    name: "Curiosidades",
    setup() {
      const curiosities = ref([]);
      const loading = ref(true);
      const editMode = ref(false);
      const editKey = ref(null);
      const newCuriosity = ref({
        title: "",
        description: "",
        file: null,
      });
  
      const fetchCuriosities = () => {
        const curiositiesRef = dbRef(database, "curiosidades");
        onValue(curiositiesRef, (snapshot) => {
          const data = snapshot.val();
          curiosities.value = data
            ? Object.entries(data).map(([key, value]) => ({
                key,
                ...value,
              }))
            : [];
          loading.value = false;
        });
      };
  
      const handleFileChange = (event) => {
        newCuriosity.value.file = event.target.files[0];
      };
  
      const addOrUpdateCuriosity = async () => {
        const file = newCuriosity.value.file;
  
        if (editMode.value) {
          // Atualizar curiosidade existente
          const curiosityRef = dbRef(database, `curiosidades/${editKey.value}`);
          const updatedData = {
            title: newCuriosity.value.title,
            description: newCuriosity.value.description,
          };
  
          if (file) {
            // Atualizar a imagem se um novo arquivo for selecionado
            const fileRef = storageRef(storage, `curiosidades/${file.name}`);
            await uploadBytes(fileRef, file);
            const fileUrl = await getDownloadURL(fileRef);
  
            // Deletar imagem antiga
            const oldImagePath = curiosities.value.find(
              (curiosity) => curiosity.key === editKey.value
            )?.imagePath;
            if (oldImagePath) {
              const oldImageRef = storageRef(storage, oldImagePath);
              await deleteObject(oldImageRef);
            }
  
            updatedData.image = fileUrl;
            updatedData.imagePath = `curiosidades/${file.name}`;
          }
  
          await update(curiosityRef, updatedData);
        } else {
          // Adicionar nova curiosidade
          if (!file) return;
  
          const fileRef = storageRef(storage, `curiosidades/${file.name}`);
          await uploadBytes(fileRef, file);
          const fileUrl = await getDownloadURL(fileRef);
  
          const curiositiesRef = dbRef(database, "curiosidades");
          await push(curiositiesRef, {
            title: newCuriosity.value.title,
            description: newCuriosity.value.description,
            image: fileUrl,
            imagePath: `curiosidades/${file.name}`,
          });
        }
  
        // Limpar formulário
        newCuriosity.value = {
          title: "",
          description: "",
          file: null,
        };
        editMode.value = false;
        editKey.value = null;
      };
  
      const editCuriosity = (curiosity) => {
        editMode.value = true;
        editKey.value = curiosity.key;
        newCuriosity.value = {
          title: curiosity.title,
          description: curiosity.description,
          file: null,
        };
      };
  
      const cancelEdit = () => {
        editMode.value = false;
        editKey.value = null;
        newCuriosity.value = {
          title: "",
          description: "",
          file: null,
        };
      };
  
      const deleteCuriosity = async (key, imagePath) => {
        try {
          const curiosityRef = dbRef(database, `curiosidades/${key}`);
          await remove(curiosityRef);
  
          const imageRef = storageRef(storage, imagePath);
          await deleteObject(imageRef);
        } catch (error) {
          console.error("Erro ao deletar curiosidade:", error);
        }
      };
  
      onMounted(fetchCuriosities);
  
      return {
        curiosities,
        loading,
        editMode,
        newCuriosity,
        handleFileChange,
        addOrUpdateCuriosity,
        editCuriosity,
        cancelEdit,
        deleteCuriosity,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Mesmos estilos do exemplo anterior */
  .header {
    position: fixed;
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
  
  .content {
    margin-top: 80px;
    padding: 20px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .header-text {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  
  .form-input-file {
    border: none;
  }
  
  .button {
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .green-button {
    background-color: #4caf50;
    color: #fff;
  }
  
  .green-button:hover {
    background-color: #45a049;
  }
  
  .blue-button {
    background-color: #2196f3;
    color: #fff;
  }
  
  .blue-button:hover {
    background-color: #1e88e5;
  }
  
  .red-button {
    background-color: #f44336;
    color: #fff;
  }
  
  .red-button:hover {
    background-color: #e53935;
  }
  
  .cancel-button {
    background-color: #ccc;
    color: #333;
  }
  
  .curiosity-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }
  
  .curiosity-item {
    display: flex;
    gap: 15px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-bottom: 15px;
    align-items: center;
  }
  
  .curiosity-image {
    width: 80px;
    height: 80px;
    border-radius: 6px;
  }
  
  .curiosity-info h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
  
  .curiosity-info p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #555;
  }
  </style>
  