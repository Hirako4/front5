<template>
  <div class="demos-container">
    <h1>📚 Учебные примеры (Practice 27-28)</h1>
    <p>Интерактивные компоненты из практических заданий. Теперь всё работает!</p>

    <div class="demos-grid">
      <!-- 1. Реактивность -->
      <div class="card-box demo-card">
        <h3>⚡ Реактивность</h3>
        <p>Счетчик кликов (ref):</p>
        <div class="counter-display">{{ count }}</div>
        <div class="btn-group">
            <button @click="count--" class="secondary">-</button>
            <button @click="count++" class="primary">+</button>
        </div>
      </div>

      <!-- 2. Поиск (v-model) - РАБОТАЕТ -->
      <div class="card-box demo-card">
        <h3>🔍 Поиск (v-model)</h3>
        <p>Начните вводить название курса:</p>
        <SearchInput v-model="searchText" placeholder="Найти курс..." />

        <ul class="search-results">
          <li v-for="item in filteredCourses" :key="item.id">
            {{ item.name }}
          </li>
          <li v-if="filteredCourses.length === 0" class="no-results">
            Ничего не найдено
          </li>
        </ul>
      </div>

      <!-- 3. Карточки (Props) - РАБОТАЮТ -->
      <div class="card-box demo-card full-width">
        <h3>👤 Компонент UserCard (Props & Events)</h3>
        <p>Кликните по карточке, чтобы изменить статус пользователя.</p>

        <div class="cards-row">
            <UserCard
                v-for="user in users"
                :key="user.id"
                :user="user"
                :isActive="user.isActive"
                @toggleStatus="toggleUserStatus(user.id)"
                style="flex: 1"
            >
                <template #actions v-if="user.role === 'admin'">
                  <button @click.stop="editAdminSettings(user)" class="small primary">Настройки</button>
                </template>
            </UserCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import UserCard from '../components/UserCard.vue'
import SearchInput from '../components/SearchInput.vue'

// --- 1. Логика Реактивности ---
const count = ref(0)

// --- 2. Логика Поиска ---
const searchText = ref('')
const courses = ref([
    { id: 1, name: 'Полное руководство по Vue.js 3' },
    { id: 2, name: 'Backend разработка на Go' },
    { id: 3, name: 'Docker для начинающих' },
    { id: 4, name: 'Продвинутый TypeScript' },
])
const filteredCourses = computed(() => {
    if (!searchText.value) {
        return courses.value;
    }
    return courses.value.filter(course =>
        course.name.toLowerCase().includes(searchText.value.toLowerCase())
    );
})

// --- 3. Логика Карточек Пользователей ---
const users = ref([
    { id: 1, name: 'Администратор', email: 'admin@system.com', role: 'admin', isActive: true },
    { id: 2, name: 'Гость', email: 'guest@visit.com', role: 'user', isActive: false },
    { id: 3, name: 'Тестировщик', email: 'qa@system.com', role: 'user', isActive: true },
])

const toggleUserStatus = (userId) => {
    const user = users.value.find(u => u.id === userId);
    if (user) {
        user.isActive = !user.isActive;
    }
}

const editAdminSettings = (user) => {
    alert(`Открыты настройки для администратора: ${user.name}`);
}
</script>

<style scoped>
.demos-container { width: 100%; }

.demos-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    width: 100%;
}

.full-width { grid-column: 1 / -1; }
.demo-card { display: flex; flex-direction: column; }
.counter-display { font-size: 3rem; font-weight: bold; color: var(--primary); margin: 10px 0; }
.btn-group { display: flex; gap: 10px; margin-top: auto; }
.cards-row { display: flex; gap: 20px; width: 100%; }

/* Стили для поиска */
.search-results {
    list-style: none;
    padding: 0;
    margin-top: 15px;
    max-height: 150px;
    overflow-y: auto;
}
.search-results li {
    padding: 8px 10px;
    border-radius: 5px;
    transition: background 0.2s;
}
.search-results li:hover {
    background: var(--bg-color);
}
.no-results {
    color: var(--text-secondary);
    opacity: 0.7;
}

button.secondary { background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); }
button.small { padding: 5px 10px; font-size: 0.9rem; }
</style>
