<script setup lang="ts">
/**
 * Fixed top header bar displaying user avatar, greeting,
 * online status indicator, and settings navigation.
 */

import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { User, Settings } from 'lucide-vue-next';
import { useTelegramStore } from '@/stores/telegram';

const router = useRouter();
const telegramStore = useTelegramStore();

const user = computed(() => {
    return telegramStore.user || {
        photo_url: null,
        first_name: 'Agent'
    };
});

const goToSettings = () => {
    telegramStore.hapticNotification('success');
    router.push('/settings');
};
</script>

<template>
    <div class="fixed top-0 left-0 w-full z-40 px-6 pt-4 pb-2 flex justify-between items-center bg-linear-to-b from-black via-black/80 to-transparent pointer-events-none">

        <button
            @click="goToSettings"
            aria-label="Open settings"
            class="pointer-events-auto flex items-center gap-3 group active:scale-95 transition-transform"
        >
            <div class="relative">
                <div class="w-9 h-9 rounded-full bg-[#151515] border border-white/10 overflow-hidden flex items-center justify-center">
                    <img v-if="user.photo_url" :src="user.photo_url" class="w-full h-full object-cover" />
                    <User v-else :size="18" class="text-gray-400" />
                </div>
                <div class="absolute -bottom-1 -right-1 bg-[#1A1A1A] rounded-full p-0.5 border border-black">
                    <div class="bg-white/10 rounded-full p-0.5">
                        <Settings :size="8" class="text-gray-400" />
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-start">
                <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">{{ $t('header.welcome') }}</span>
                <span class="text-sm font-bold text-white leading-none">{{ user.first_name }}</span>
            </div>
        </button>

        <div class="pointer-events-auto bg-[#151515] border border-white/5 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span class="text-[9px] font-bold text-gray-300 tracking-wide">{{ $t('header.online') }}</span>
        </div>
    </div>
</template>
