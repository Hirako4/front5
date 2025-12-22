<template>
  <div class="tab-content">
    <h3>📝 Последние публикации</h3>
    <div class="post" v-for="i in 3" :key="i">
      <div class="post-header">
        <span class="post-date">Сегодня, 14:3{{ i }}</span>
      </div>
      <p>Изучаю Vue Router и Composition API. Это пост номер {{ i }}, который подгрузился динамически!</p>
      <div class="post-actions">
        <button class="small-btn">❤️ Лайк</button>
        <button class="small-btn">💬 Комментарий</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post { background: var(--bg-color); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid var(--border-color); }
.post-date { font-size: 0.8rem; color: var(--text-secondary); }
.post-actions { margin-top: 10px; display: flex; gap: 10px; }
.small-btn { padding: 5px 10px; font-size: 0.85rem; background: transparent; border: 1px solid var(--border-color); color: var(--text-secondary); }
.small-btn:hover { border-color: var(--primary); color: var(--primary); }
</style>
