// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './../src/views/Login.vue'; // Importa a página de login
import Conteudos from './../src/views/Conteudos.vue'; // Importa a página de conteúdos
import Anatomia from './../src/views/Anatomia.vue'; // Caminho para o Anatomia.vue

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login, // Define o login como a página inicial
  },
  {
    path: '/conteudos',
    name: 'Conteudos',
    component: Conteudos, // Define a rota para a página de conteúdos
  },
  {
    path: '/anatomia',
    name: 'Anatomia',
    component: Anatomia,
  },
  {
    path: '/fisiologia',
    name: 'Fisiologia',
    component: () => import('@/views/Fisiologia.vue'),
  },
  {
    path: '/curiosidades', 
    name: 'Curiosidades',
    component: () => import('@/views/Curiosidades.vue'),
  },
  {
    path: '/funcao', 
    name: 'Funcao',
    component: () => import('@/views/Funcao.vue'),
  },
  {
    path: '/sintomas', 
    name: 'Sintomas',
    component: () => import('@/views/Sintomas.vue'),
  },
  {
    path: '/prevencao', 
    name: 'Prevencao',
    component: () => import('@/views/Prevencao.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
