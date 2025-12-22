<template>
  <div class="home-page">
    <div class="hero-section card-box">
      <h1>👋 Добро пожаловать!</h1>
      <p class="subtitle">Это итоговый проект по практикам Vue.js (27-30)</p>

      <div class="features-grid">
        <div class="feature-card" @click="$router.push('/palette')">
          <div class="icon">🎨</div>
          <h3>Генератор палитр</h3>
          <p>Создавайте цвета, блокируйте понравившиеся и копируйте HEX коды.</p>
        </div>

        <div class="feature-card" @click="$router.push('/demos')">
          <div class="icon">📚</div>
          <h3>Компоненты</h3>
          <p>Примеры реактивности, пропсов и событий в действии.</p>
        </div>

        <div class="feature-card" @click="$router.push('/profile')">
          <div class="icon">👤</div>
          <h3>Профиль</h3>
          <p>Динамические роуты, вложенные маршруты и параметры.</p>
        </div>
      </div>
    </div>

    <div class="users-section card-box">
      <h3>Быстрый переход к пользователям:</h3>
      <ul class="user-list">
        <li v-for="u in users" :key="u.id" @click="$router.push(`/profile/${u.id}`)" class="user-item">
          <div class="avatar-mini">{{ u.name[0] }}</div>
          <span>{{ u.name }}</span>
          <span class="arrow">→</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
    { id: 1, name: 'Анна Иванова' },
    { id: 2, name: 'Петр Сидоров' },
    { id: 3, name: 'Мария Петрова' }
])
</script>

<style scoped>
.hero-section { text-align: center; padding: 40px; }
.subtitle { font-size: 1.2rem; margin-bottom: 40px; color: var(--text-secondary); }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; text-align: left; }
.feature-card { padding: 20px; border: 1px solid var(--border-color); border-radius: 12px; cursor: pointer; transition: transform 0.2s, background 0.2s; background: var(--bg-color); }
.feature-card:hover { transform: translateY(-5px); border-color: var(--primary); }
.feature-card .icon { font-size: 2.5rem; margin-bottom: 10px; }
.feature-card h3 { margin: 0 0 10px 0; color: var(--text-main); }
.feature-card p { margin: 0; font-size: 0.95rem; }

.user-list { list-style: none; padding: 0; display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
.user-item { display: flex; align-items: center; gap: 10px; padding: 10px 15px; background: var(--bg-color); border-radius: 8px; cursor: pointer; border: 1px solid transparent; transition: 0.2s; }
.user-item:hover { border-color: var(--primary); background: var(--card-bg); }
.avatar-mini { width: 30px; height: 30px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: bold; }
.arrow { margin-left: auto; color: var(--text-secondary); }
</style>
