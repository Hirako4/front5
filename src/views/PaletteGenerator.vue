<template>
  <div class="palette-app">
    <div class="header-controls">
        <h1>🎨 Генератор палитр</h1>
        <p>Нажмите пробел чтобы сгенерировать новую палитру</p>
        <button class="gen-btn" @click="generatePalette">Сгенерировать (Пробел)</button>
    </div>

    <div class="palette-container">
        <div v-for="(color, index) in colors" :key="index" class="color-column" :style="{ background: color }">
            <div class="color-text" @click="copyToClipboard(color)">
                <span class="hex-code">{{ color }}</span>
                <span class="copy-hint">Копировать</span>
            </div>
            <button class="lock-btn" @click="toggleLock(index)" :title="locked[index] ? 'Разблокировать' : 'Заблокировать'">
                {{ locked[index] ? '🔒' : '🔓' }}
            </button>
        </div>
    </div>

    <!-- Уведомление -->
    <div class="toast" v-if="notification">{{ notification }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const colors = ref([])
const locked = ref([false, false, false, false, false])
const notification = ref('')

const generateColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const generatePalette = () => {
    const newColors = [...colors.value];
    // Если массив пустой (первый запуск)
    if (newColors.length === 0) {
        for(let i=0; i<5; i++) newColors.push(generateColor())
    } else {
        for(let i=0; i<5; i++) {
            if (!locked.value[i]) {
                newColors[i] = generateColor();
            }
        }
    }
    colors.value = newColors;
}

const toggleLock = (index) => {
    locked.value[index] = !locked.value[index];
}

const showNotification = (msg) => {
    notification.value = msg;
    setTimeout(() => notification.value = '', 2000);
}

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification(`Цвет ${text} скопирован! ✅`);
}

const handleKeydown = (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        generatePalette();
    }
}

// 1. Загрузка из LocalStorage при старте
onMounted(() => {
    const savedColors = localStorage.getItem('palette_colors');
    const savedLocked = localStorage.getItem('palette_locked');

    if (savedColors) {
        colors.value = JSON.parse(savedColors);
        if (savedLocked) locked.value = JSON.parse(savedLocked);
    } else {
        generatePalette();
    }

    window.addEventListener('keydown', handleKeydown);
})

// 2. Авто-сохранение при изменениях
watch([colors, locked], () => {
    localStorage.setItem('palette_colors', JSON.stringify(colors.value));
    localStorage.setItem('palette_locked', JSON.stringify(locked.value));
}, { deep: true })

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
})
</script>

<style scoped>
.palette-app {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
  width: 100%;
  position: relative;
}

.header-controls { text-align: center; margin-bottom: 20px; }
.header-controls h1 { margin-bottom: 5px; }

.palette-container {
  display: flex;
  flex: 1;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.color-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background 0.3s ease;
}

.color-text {
  background: rgba(0,0,0,0.15);
  color: white;
  padding: 15px 30px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(5px);
  transition: transform 0.2s;
}
.color-text:hover { transform: scale(1.05); background: rgba(0,0,0,0.25); }
.hex-code { font-size: 1.5rem; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
.copy-hint { font-size: 0.8rem; margin-top: 5px; opacity: 0.8; }

.lock-btn {
  margin-top: 30px;
  background: rgba(255,255,255,0.8);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.2s;
}
.lock-btn:hover { transform: translateY(-3px); background: white; }

.gen-btn {
  margin-top: 10px;
  padding: 12px 30px;
  font-size: 1.1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.toast {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: bold;
    animation: fadeUp 0.3s ease;
    z-index: 1000;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translate(-50%, 20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
}
</style>
