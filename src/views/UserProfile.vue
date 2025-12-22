<template>
  <div class="profile-page">
    <div class="profile-header card-box">
      <div class="avatar-placeholder">{{ id ? id[0] : 'U' }}</div>
      <div class="profile-info">
        <h1>{{ id ? `Пользователь #${id}` : 'Мой Профиль' }}</h1>
        <p class="status">Backend Developer • Online</p>
        <div class="stats">
          <span><strong>42</strong> поста</span>
          <span><strong>128</strong> друзей</span>
          <span><strong>15</strong> проектов</span>
        </div>
      </div>
      <button class="primary edit-btn">Редактировать</button>
    </div>

    <div class="profile-nav">
      <router-link :to="`/profile/${id || ''}/info`" class="tab-link">Информация</router-link>
      <router-link :to="`/profile/${id || ''}/posts`" class="tab-link">Посты</router-link>
      <router-link :to="`/profile/${id || ''}/friends`" class="tab-link">Друзья</router-link>
    </div>

    <div class="content-area card-box">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
        <!-- Заглушка по умолчанию, если под-роут не выбран -->
        <div v-if="!$route.path.split('/').pop().match(/info|posts|friends/)" class="default-content">
           <h3>Обо мне</h3>
           <p>Привет! Я увлекаюсь веб-разработкой, люблю Vue.js и решать сложные задачи. В свободное время занимаюсь восстановлением старых автомобилей.</p>
           <div class="tech-stack">
             <span>Vue 3</span><span>Go</span><span>Docker</span><span>Linux</span>
           </div>
        </div>
      </router-view>
    </div>
  </div>
</template>

<script setup>
defineProps(['id'])
</script>

<style scoped>
.profile-header { display: flex; align-items: center; gap: 30px; }
.avatar-placeholder { width: 100px; height: 100px; background: var(--primary); color: white; font-size: 3rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; }
.profile-info { flex: 1; }
.profile-info h1 { margin: 0 0 5px 0; font-size: 2rem; }
.status { color: var(--text-secondary); margin-bottom: 15px; }
.stats { display: flex; gap: 20px; font-size: 1.1rem; }
.profile-nav { display: flex; gap: 10px; margin-bottom: 20px; }
.tab-link { padding: 12px 24px; background: var(--card-bg); color: var(--text-secondary); text-decoration: none; border-radius: 10px; font-weight: 600; transition: 0.2s; border: 1px solid var(--border-color); }
.tab-link.router-link-active { background: var(--primary); color: white; border-color: var(--primary); }
.default-content p { font-size: 1.1rem; }
.tech-stack { display: flex; gap: 10px; margin-top: 15px; }
.tech-stack span { background: var(--bg-color); padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; border: 1px solid var(--border-color); }
</style>
