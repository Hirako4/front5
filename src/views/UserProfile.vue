<!-- src/views/UserProfile.vue -->
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

    <div class="content-area">
      <router-view />
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: [String, null],
    default: null
  }
})
</script>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  background: var(--primary);
  color: white;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
}

.profile-info {
  flex: 1;
  min-width: 250px;
}

.profile-info h1 {
  margin: 0 0 5px 0;
  font-size: 2rem;
}

.status {
  color: var(--text-secondary);
  margin-bottom: 15px;
}

.stats {
  display: flex;
  gap: 20px;
  font-size: 1.1rem;
}

.profile-nav {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.tab-link {
  padding: 12px 24px;
  background: var(--card-bg);
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: 0.2s;
  border: 1px solid var(--border-color);
}

.tab-link.router-link-active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.content-area {
  min-height: 300px;
}

.default-content h3 {
  margin-top: 0;
}
</style>
