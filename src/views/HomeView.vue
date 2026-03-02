<script setup lang="ts">
/**
 * Landing screen with animated branding and node initialization CTA.
 * Displays a live active-node count and navigates to the dashboard.
 */

import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ChevronRight, Globe, ShieldCheck, Cpu } from 'lucide-vue-next';
import { useTelegramStore } from '@/stores/telegram';
import { useToastStore } from '@/stores/toast';
import CocoLogo from '@/assets/images/logo.png';

const { t } = useI18n();
const router = useRouter();
const telegramStore = useTelegramStore();
const toast = useToastStore();

const isLoading = ref(false);
const onlineUsers = ref(14205);

let onlineInterval: ReturnType<typeof setInterval>;

onMounted(() => {
    onlineInterval = setInterval(() => {
        onlineUsers.value += Math.floor(Math.random() * 5) - 2;
    }, 2000);
});

onUnmounted(() => {
    clearInterval(onlineInterval);
});

const handleEnter = () => {
    telegramStore.hapticNotification('success');
    isLoading.value = true;

    setTimeout(() => {
        sessionStorage.setItem('node_initialized', '1');
        router.push('/dashboard');
        toast.show(t('home.connection_established'), 'success');
    }, 1500);
};
</script>

<template>
    <div class="h-screen bg-black text-white flex flex-col relative font-sans overflow-hidden select-none">

        <div class="fixed top-[-20%] left-[-20%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
        <div class="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div class="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px] pointer-events-none mask-gradient"></div>

        <div class="flex-1 flex flex-col items-center justify-center relative z-10 px-6">

            <div class="relative w-64 h-64 mb-12 flex items-center justify-center">
                <div class="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div class="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div class="absolute inset-0 bg-primary/10 blur-[60px] rounded-full animate-pulse"></div>

                <div class="relative z-10 w-32 h-32 bg-[#0A0A0A] border border-white/10 rounded-3xl flex items-center justify-center shadow-[0_0_50px_-10px_rgba(var(--color-primary),0.3)] rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img :src="CocoLogo" alt="COCO" />
                </div>

                <div class="absolute top-0 right-10 w-2 h-2 bg-primary rounded-full animate-float delay-100"></div>
                <div class="absolute bottom-10 left-10 w-3 h-3 bg-blue-500/50 rounded-full animate-float delay-300"></div>
            </div>

            <div class="text-center space-y-4 mb-16 max-w-sm">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span class="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                        {{ onlineUsers.toLocaleString() }} {{ $t('home.active_nodes') }}
                    </span>
                </div>

                <h1 class="text-4xl font-black tracking-tighter text-white leading-tight">
                    {{ $t('home.tagline_top') }} <br />
                    <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">{{ $t('home.tagline_highlight') }}</span>
                </h1>

                <p class="text-sm text-gray-400 leading-relaxed px-4">
                    {{ $t('home.description', { token: 'COCO' }) }}
                </p>
            </div>

            <button
                @click="handleEnter"
                :disabled="isLoading"
                class="w-full h-16 bg-white text-black font-bold text-lg rounded-2xl flex items-center justify-between px-6 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all group relative overflow-hidden"
            >
                <div v-if="isLoading" class="absolute inset-0 bg-gray-200 flex items-center justify-center gap-2">
                    <div class="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    <span class="text-sm uppercase tracking-widest">{{ $t('home.initializing') }}</span>
                </div>

                <template v-else>
                    <span class="flex items-center gap-3">
                        <Cpu :size="24" />
                        {{ $t('home.initialize') }}
                    </span>
                    <div class="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <ChevronRight :size="20" />
                    </div>
                </template>
            </button>

            <div class="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <div class="flex items-center gap-1.5">
                    <ShieldCheck :size="14" />
                    <span class="text-[10px] font-bold">{{ $t('home.audited') }}</span>
                </div>
                <div class="w-px h-3 bg-white/20"></div>
                <div class="flex items-center gap-1.5">
                    <Globe :size="14" />
                    <span class="text-[10px] font-bold">{{ $t('home.global') }}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.mask-gradient {
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

</style>
