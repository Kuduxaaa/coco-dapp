<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useTelegramStore } from '@/stores/telegram';

import TheToast from '@/components/ui/TheToast.vue';
import TheBottomNav from '@/components/ui/TheBottomNav.vue';

const telegramStore = useTelegramStore();
const route = useRoute();
const showNav = computed(() => route.meta.showNav);

onMounted(() => {
    telegramStore.init();
});
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  
  <TheBottomNav v-if="showNav" />
  <TheToast />
  
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>