<template>
  <div class="user-card" :class="user.role" @click="$emit('toggleStatus')" title="Нажмите, чтобы изменить статус">
    <div class="card-header">
        <h3>{{ user.name }}</h3>
        <span class="role-badge">{{ user.role }}</span>
    </div>
    <p>Email: {{ user.email }}</p>
    <p>Статус: <span class="status-indicator" :class="{ active: isActive }">{{ isActive ? 'Активен' : 'Неактивен' }}</span></p>

    <!-- Слот для действий -->
    <div class="card-actions">
        <slot name="actions"></slot>
    </div>

    <!-- Слот по умолчанию -->
    <div class="card-footer">
        <slot>
          <p class="no-info">Нет доп. информации</p>
        </slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
    validator: (value) => value.name && value.email
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
// Определяем событие, которое компонент может отправлять
defineEmits(['toggleStatus'])
</script>

<style scoped>
.user-card {
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: 12px;
  background: var(--card-bg);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.user-card:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(0,0,0,0.07); }
.user-card.admin { border-left: 5px solid #ff6b6b; }
.user-card.user { border-left: 5px solid #4ecdc4; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.role-badge { font-size: 0.8em; padding: 2px 8px; border-radius: 12px; background: var(--bg-color); }
.status-indicator { font-weight: bold; color: #ff6b6b; } /* Неактивен */
.status-indicator.active { color: #4ecdc4; } /* Активен */
.card-actions { margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 10px; }
.no-info { color: var(--text-secondary); opacity: 0.7; font-size: 0.9rem; }
</style>
