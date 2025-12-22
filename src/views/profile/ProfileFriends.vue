<template>
  <div class="tab-content">
    <h3>👥 Друзья (128)</h3>
    <div class="friends-grid">
      <div class="friend-card" v-for="i in 6" :key="i">
        <div class="friend-avatar">U{{ i }}</div>
        <div class="friend-name">User {{ i }}</div>
        <button class="add-btn">Написать</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friends-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; }
.friend-card { background: var(--bg-color); padding: 15px; border-radius: 8px; text-align: center; border: 1px solid var(--border-color); }
.friend-avatar { width: 50px; height: 50px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; }
.friend-name { font-weight: bold; margin-bottom: 10px; font-size: 0.9rem; }
.add-btn { width: 100%; padding: 5px; font-size: 0.8rem; background: transparent; border: 1px solid var(--primary); color: var(--primary); }
.add-btn:hover { background: var(--primary); color: white; }
</style>
