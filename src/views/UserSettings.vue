<template>
  <div class="settings-page">
    <h1>Настройки аккаунта</h1>

    <div class="settings-layout">
      <aside class="sidebar card-box">
        <button @click="$router.push('/settings/general')" :class="{ active: currentTab === 'general' }">Общие</button>
        <button @click="$router.push('/settings/security')" :class="{ active: currentTab === 'security' }">Безопасность</button>
        <button @click="$router.push('/settings/notifications')" :class="{ active: currentTab === 'notifications' }">Уведомления</button>
      </aside>

      <div class="settings-content card-box">
        <!-- Общие настройки -->
        <div v-if="currentTab === 'general'">
          <h2>Общие настройки</h2>
          <form @submit.prevent="saveSettings">
            <div class="form-group">
                <label>Имя пользователя</label>
                <input type="text" v-model="formData.username" />
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="formData.email" />
            </div>
            <div class="form-group">
                <label>Язык интерфейса</label>
                <select v-model="formData.language">
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                </select>
            </div>
            <button class="primary">Сохранить</button>
          </form>
        </div>

        <!-- Безопасность -->
        <div v-else-if="currentTab === 'security'">
          <h2>Безопасность</h2>
          <div class="form-group">
            <label>Текущий пароль</label>
            <input type="password" placeholder="••••••" />
          </div>
          <div class="form-group">
            <label>Новый пароль</label>
            <input type="password" />
          </div>
          <button class="primary" style="margin-top: 10px">Обновить пароль</button>
        </div>

         <!-- Уведомления -->
         <div v-else-if="currentTab === 'notifications'">
          <h2>Уведомления</h2>
          <label class="toggle-row">
            <input type="checkbox" v-model="formData.notifications.email">
            Получать новости на Email
          </label>
          <label class="toggle-row">
            <input type="checkbox" v-model="formData.notifications.push">
            Push-уведомления
          </label>
          <p style="margin-top:20px; font-size: 0.9rem; color: var(--text-secondary)">
              Статус: {{ formData.notifications.email ? 'Подписан на email' : 'Без спама' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// Определяем текущую вкладку из URL
const currentTab = computed(() => route.params.tab || 'general')

// Реактивные данные формы
const formData = reactive({
    username: 'Magamed',
    email: 'user@example.com',
    language: 'ru',
    notifications: {
        email: true,
        push: false
    }
})

const saveSettings = () => {
    alert(`Сохранено: ${formData.username} (${formData.language})`)
}
</script>

<style scoped>
.settings-layout { display: flex; gap: 20px; align-items: flex-start; }
.sidebar { width: 250px; display: flex; flex-direction: column; padding: 10px; gap: 5px; }
.sidebar button { text-align: left; background: transparent; padding: 15px; border-radius: 10px; transition: 0.2s; color: var(--text-secondary); font-weight: 500; border: none; cursor: pointer; }
.sidebar button:hover { background: var(--bg-color); }
.sidebar button.active { background: var(--primary); color: white; }
.settings-content { flex: 1; min-height: 400px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.95rem; }
.form-group input, .form-group select { width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-color); color: var(--text-main); font-size: 1rem; }
.toggle-row { display: flex; gap: 10px; align-items: center; margin-bottom: 15px; cursor: pointer; user-select: none; }
.toggle-row input { width: 20px; height: 20px; }
</style>
