<template>
  <div class="app-container" :class="{ 'dark-theme': isDark }">
    <header class="main-header">
      <div class="header-inner">
        <div class="logo">
          <span class="icon">⚡</span> Vue Practice
        </div>

        <nav class="main-nav">
          <router-link to="/" class="nav-link">Главная</router-link>
          <router-link to="/demos" class="nav-link">Демки</router-link>
          <router-link to="/palette" class="nav-link">Палитра</router-link>
          <router-link to="/settings" class="nav-link">Настройки</router-link>
        </nav>

        <button class="theme-toggle" @click="toggleTheme" title="Сменить тему">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>

    <main class="main-view">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
  }
})
</script>

<style>
/* ГЛОБАЛЬНЫЙ СБРОС (NUCLEAR OPTION) */
html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow-x: hidden;
}

#app {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important; /* Отключаем Grid центрирование Vite */
}

/* --- Переменные --- */
:root {
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #1e293b;
  --text-secondary: #64748b;
  --primary: #3b82f6;
  --header-bg: #ffffff;
  --border-color: #e2e8f0;
}

.dark-theme {
  --bg-color: #0f172a;
  --card-bg: #1e293b;
  --text-main: #f1f5f9;
  --text-secondary: #94a3b8;
  --primary: #60a5fa;
  --header-bg: #1e293b;
  --border-color: #334155;
}

/* Контейнер приложения */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-color);
  color: var(--text-main);
  transition: background-color 0.3s, color 0.3s;
}

/* --- Шапка --- */
.main-header {
  width: 100%; /* Гарантированно во всю ширину */
  background-color: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-inner {
  width: 100%; /* Контент внутри шапки */
  padding: 0 2rem; /* Отступы слева и справа */
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.main-nav {
  display: flex;
  gap: 30px;
  flex: 1; /* Занимает место по центру */
  justify-content: center;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 1.1rem;
  padding: 10px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-link:hover, .nav-link.router-link-active {
  color: var(--primary);
}
.nav-link.router-link-active { border-bottom-color: var(--primary); }

.theme-toggle {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-main);
}

/* --- Контент --- */
.main-view {
  flex: 1;
  width: 100%;
  padding: 2rem;
  overflow-x: hidden;
}

/* Карточки */
.card-box {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  border: 1px solid var(--border-color);
}
</style>
