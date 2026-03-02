<script setup lang="ts">
/**
 * Crash-style mini-game where users stake COCO tokens.
 * A multiplier climbs until it crashes at a random point;
 * players must cash out before the crash to win.
 */

import { ref, computed, onUnmounted } from 'vue';
import {
    Zap,
    WifiOff,
    History,
    Signal,
    TriangleAlert
} from 'lucide-vue-next';
import { useToastStore } from '@/stores/toast';
import { useTelegramStore } from '@/stores/telegram';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const toast = useToastStore();
const telegramStore = useTelegramStore();

const isRunning = ref(false);
const hasCrashed = ref(false);
const multiplier = ref(1.00);
const stakeAmount = ref(100);
const history = ref<number[]>([1.45, 2.10, 1.10, 5.43, 1.05]);

let gameInterval: number;
let crashPoint = 0;

const currentWin = computed(() => (stakeAmount.value * multiplier.value).toFixed(0));

const startGame = () => {
    if (isRunning.value) return;

    hasCrashed.value = false;
    multiplier.value = 1.00;
    isRunning.value = true;
    telegramStore.hapticNotification('success');

    const r = Math.random();
    crashPoint = Math.floor(100 / (r * 100 + 1) * 100) / 100;
    if (crashPoint < 1.1) crashPoint = 1.05;

    loop();
};

const loop = () => {
    if (!isRunning.value) return;

    if (multiplier.value >= crashPoint) {
        crash();
        return;
    }

    const increase = 0.01 + (multiplier.value * 0.0008);
    multiplier.value += increase;

    if (Math.random() > 0.8) telegramStore.hapticNotification('success');

    gameInterval = requestAnimationFrame(loop);
};

const cashOut = () => {
    if (!isRunning.value || hasCrashed.value) return;

    isRunning.value = false;
    cancelAnimationFrame(gameInterval);

    const winAmount = Math.floor(stakeAmount.value * multiplier.value);
    telegramStore.hapticNotification('success');
    toast.show(t('win_message', { amount: winAmount }), 'success');

    addToHistory(multiplier.value);
};

const crash = () => {
    isRunning.value = false;
    hasCrashed.value = true;
    cancelAnimationFrame(gameInterval);
    telegramStore.hapticNotification('error');

    addToHistory(multiplier.value);
};

const addToHistory = (val: number) => {
    history.value.unshift(Number(val.toFixed(2)));
    if (history.value.length > 5) history.value.pop();
};

const adjustStake = (delta: number) => {
    if (isRunning.value) return;
    const newAmount = stakeAmount.value + delta;
    if (newAmount >= 50 && newAmount <= 5000) stakeAmount.value = newAmount;
    telegramStore.hapticNotification('success');
};

onUnmounted(() => {
    cancelAnimationFrame(gameInterval);
});
</script>

<template>
    <div class="h-screen bg-black text-white flex flex-col relative font-sans overflow-hidden select-none">

        <div class="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-size-[30px_30px] transition-transform duration-100"
             :class="isRunning ? 'scale-105' : 'scale-100'"></div>

        <div class="relative z-10 px-6 pt-4 pb-2 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full animate-pulse"
                     :class="isRunning ? 'bg-red-500' : 'bg-primary'"></div>
                <span class="text-[10px] font-bold font-mono text-gray-500 tracking-wider">
                    {{ isRunning ? 'NET_OVERLOAD' : 'NET_IDLE' }}
                </span>
            </div>
            <div class="flex items-center gap-2 bg-[#151515] px-2.5 py-1 rounded-md border border-white/5">
                <Signal :size="10" class="text-gray-500" />
                <span class="text-[9px] font-bold text-gray-500">PING: 2ms</span>
            </div>
        </div>

        <div class="flex-1 flex flex-col items-center justify-evenly relative z-10 w-full max-w-md mx-auto">

            <div class="relative flex items-center justify-center">
                <div class="w-64 h-64 sm:w-72 sm:h-72 relative aspect-square flex items-center justify-center">

                    <div class="absolute inset-0 rounded-full blur-[70px] transition-all duration-300"
                         :class="hasCrashed ? 'bg-red-600/20' : (isRunning ? 'bg-primary/20 scale-110' : 'bg-primary/5')"></div>

                    <svg class="absolute inset-0 w-full h-full animate-spin-slow opacity-20 pointer-events-none" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="4 4" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="0.2" opacity="0.5" />
                    </svg>

                    <div class="relative z-20 text-center flex flex-col items-center justify-center">
                        <h1 class="text-5xl font-black tracking-tighter tabular-nums font-mono transition-all duration-100 leading-none"
                            :class="[
                                hasCrashed ? 'text-red-500 shake' : 'text-white',
                                isRunning ? 'scale-110' : ''
                            ]">
                            {{ multiplier.toFixed(2) }}x
                        </h1>

                        <p class="text-[10px] font-bold tracking-[0.2em] mt-3 uppercase"
                           :class="hasCrashed ? 'text-red-500' : 'text-primary'">
                            {{ hasCrashed ? 'FAILURE' : (isRunning ? 'UPLOADING' : 'READY') }}
                        </p>

                        <div v-if="isRunning" class="absolute -bottom-14 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                            <span class="text-[9px] text-gray-400">{{ $t('game.profit') }}</span>
                            <span class="text-primary font-bold text-xs font-mono">+{{ currentWin }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full px-6">
                <div class="flex items-center gap-2 mb-3 opacity-50">
                    <History :size="10" />
                    <span class="text-[9px] font-bold uppercase tracking-wider">{{ $t('game.previous') }}</span>
                </div>
                <div class="flex gap-2 justify-center h-8">
                    <div v-for="(h, i) in history" :key="i"
                         class="flex-1 flex items-center justify-center rounded-md text-[10px] font-bold font-mono border transition-all max-w-15"
                         :class="h >= 2.0 ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-[#151515] border-white/5 text-gray-600'">
                        {{ h.toFixed(2) }}x
                    </div>
                </div>
            </div>

        </div>

        <div class="bg-[#111] border-t border-white/5 p-5 pb-20 relative z-20 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">

            <div class="flex items-center justify-between mb-4 bg-black/40 p-1.5 rounded-xl border border-white/5">
                <button @click="adjustStake(-50)" :disabled="isRunning" class="w-10 h-10 rounded-lg bg-[#1A1A1A] text-gray-400 hover:text-white font-bold text-lg disabled:opacity-30 active:scale-95 transition">-</button>
                <div class="flex flex-col items-center">
                    <span class="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{{ $t('game.stake') }}</span>
                    <span class="text-lg font-bold text-white font-mono leading-none mt-0.5">{{ stakeAmount }}</span>
                </div>
                <button @click="adjustStake(50)" :disabled="isRunning" class="w-10 h-10 rounded-lg bg-[#1A1A1A] text-gray-400 hover:text-white font-bold text-lg disabled:opacity-30 active:scale-95 transition">+</button>
            </div>

            <button
                @click="isRunning ? cashOut() : startGame()"
                class="w-full h-14 rounded-xl font-bold text-base tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2 relative overflow-hidden active:scale-[0.98]"
                :class="[
                    hasCrashed ? 'bg-red-500/10 text-red-500 border border-red-500/50' :
                    (isRunning ? 'bg-orange-500 text-black shadow-orange-500/20' : 'bg-primary text-black shadow-primary/20 hover:brightness-110')
                ]"
            >
                <template v-if="hasCrashed">
                    <TriangleAlert :size="18" />
                    <span>{{ $t('game.retry') }}</span>
                </template>

                <template v-else-if="isRunning">
                    <WifiOff :size="18" />
                    <span>{{ $t('game.eject') }}</span>
                </template>

                <template v-else>
                    <Zap :size="18" class="fill-black" />
                    <span>{{ $t('game.upload') }}</span>
                </template>
            </button>

        </div>
    </div>
</template>

<style scoped>
.shake {
    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
    40%, 60% { transform: translate3d(3px, 0, 0); }
}

.animate-spin-slow {
    animation: spin 10s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>
