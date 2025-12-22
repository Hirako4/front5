<template>
  <div class="search-container">
    <label v-if="label">{{ label }}</label>
    <div class="input-wrapper">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :placeholder="placeholder"
          class="search-input"
          type="text"
        />
        <button v-if="modelValue" @click="$emit('update:modelValue', '')" class="clear-btn">×</button>
    </div>
    <div class="search-actions">
      <button @click="$emit('search')">Найти</button>
      <button @click="$emit('reset')">Сбросить</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  placeholder: { type: String, default: 'Поиск...' }
})
defineEmits(['update:modelValue', 'search', 'reset'])
</script>

<style scoped>
.search-container { margin: 20px 0; }
.input-wrapper { position: relative; display: flex; align-items: center; }
.search-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
.clear-btn { position: absolute; right: 10px; background: none; border: none; cursor: pointer; font-size: 1.2rem; }
.search-actions { margin-top: 10px; display: flex; gap: 10px; }
button { padding: 5px 15px; cursor: pointer; background: #667eea; color: white; border: none; border-radius: 4px; }
</style>
