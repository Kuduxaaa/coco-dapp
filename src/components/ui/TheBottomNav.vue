<script setup lang="ts">
/**
 * Fixed bottom navigation bar with five main app tabs.
 * Highlights the active route and triggers haptic feedback on tap.
 */

import { useRouter, useRoute } from 'vue-router';
import { useTelegramStore } from '@/stores/telegram';
import { Home, Cpu, Wallet, Users, Gamepad2 } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const route = useRoute();
const telegramStore = useTelegramStore();
const { t } = useI18n();

const tabs = [
    { id: 'dashboard', name: 'dashboard', icon: Home, label: t('menu.dashboard') },
    { id: 'lab', name: 'lab', icon: Cpu, label: t('menu.lab') },
    { id: 'assets', name: 'assets', icon: Wallet, label: t('menu.assets') },
    { id: 'network', name: 'network', icon: Users, label: t('menu.network') },
    { id: 'game', name: 'game', icon: Gamepad2, label: t('menu.game') },
];

const selectTab = (tabName: string) => {
    telegramStore.hapticNotification('success');
    router.push({ name: tabName });
};

const isActive = (name: string) => route.name === name;
</script>

<template>
    <nav aria-label="Main navigation" class="fixed bottom-0 left-0 w-full z-40 bg-black border-t border-white/5 pb-safe">
        <div class="flex justify-between items-end px-4 pt-3 pb-2 max-w-md mx-auto">

            <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="selectTab(tab.name)"
                :aria-label="tab.label"
                :aria-current="isActive(tab.name) ? 'page' : undefined"
                class="flex flex-col items-center gap-1 w-14 group"
            >
                <div
                    class="relative flex items-center justify-center w-12 h-8 rounded-full transition-all duration-300"
                    :class="isActive(tab.name) ? 'bg-primary text-black' : 'bg-transparent text-[#5e5e5e] group-hover:text-gray-300'"
                >
                    <component
                        :is="tab.icon"
                        :size="20"
                        stroke-width="2.5"
                        class="transition-transform duration-200 group-active:scale-90"
                    />
                </div>

                <span
                    class="text-[10px] font-medium tracking-wide transition-colors duration-300"
                    :class="isActive(tab.name) ? 'text-white' : 'text-[#5e5e5e]'"
                >
                    {{ tab.label }}
                </span>
            </button>

        </div>
    </nav>
</template>

<style scoped>
.pb-safe {
    padding-bottom: env(safe-area-inset-bottom, 16px);
}
</style>
