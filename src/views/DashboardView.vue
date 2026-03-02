<script setup lang="ts">
/**
 * Main mining dashboard view.
 * Users hold the central button to actively mine COCO tokens.
 * Passive dust mining runs in the background at a reduced rate.
 */

import { ref, onUnmounted, computed } from 'vue';
import { useTelegramStore } from '@/stores/telegram';
import BaseModal from '@/components/ui/BaseModal.vue';
import { Zap, Battery, Lock } from 'lucide-vue-next';
import TheHeader from '@/components/ui/TheHeader.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const telegramStore = useTelegramStore();
const isHolding = ref(false);
const cocoBalance = ref(0.00);
const cocoPrice = 0.45;
const baseSpeed = 0.000005;
const showBoostModal = ref(false);

let miningInterval: ReturnType<typeof setInterval>;
let hapticInterval: ReturnType<typeof setInterval>;
let passiveInterval: ReturnType<typeof setInterval>;

const startMining = (e: Event) => {
    e.preventDefault();
    if (isHolding.value) return;

    isHolding.value = true;
    telegramStore.hapticNotification('success');

    miningInterval = setInterval(() => {
        cocoBalance.value += baseSpeed;
    }, 50);

    hapticInterval = setInterval(() => {
        telegramStore.hapticNotification('success');
    }, 150);
};

const stopMining = () => {
    if (!isHolding.value) return;

    isHolding.value = false;
    clearInterval(miningInterval);
    clearInterval(hapticInterval);
    startPassiveDust();
};

const startPassiveDust = () => {
    clearInterval(passiveInterval);
    passiveInterval = setInterval(() => {
        if (!isHolding.value) {
            cocoBalance.value += baseSpeed / 100;
        }
    }, 100);
};

startPassiveDust();

onUnmounted(() => {
    clearInterval(miningInterval);
    clearInterval(hapticInterval);
    clearInterval(passiveInterval);
});

const formattedCoco = computed(() => {
    return cocoBalance.value.toFixed(6);
});

const usdEquivalent = computed(() => {
    return (cocoBalance.value * cocoPrice).toFixed(2);
});
</script>

<template>
    <div class="min-h-screen bg-black text-white flex flex-col relative font-sans overflow-hidden select-none">
        <TheHeader />
        <div class="fixed top-[-20%] left-[-20%] w-150 h-150 bg-primary/5 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>

        <div class="flex-1 flex flex-col items-center justify-center mt-12 relative z-20 pb-12">

            <div class="text-center mb-0 mt-12 relative w-full">
                <div class="relative inline-block px-4">
                    <h1 class="text-5xl font-bold text-white tracking-tight tabular-nums font-mono transition-all duration-100 leading-none"
                        :class="isHolding ? 'text-primary drop-shadow-[0_0_20px_rgba(var(--color-primary),0.4)]' : ''">
                        {{ formattedCoco }}
                    </h1>
                    <span :style="{ right: '-60px', top: '27px' }" class="absolute text-xs font-bold text-primary -rotate-90 origin-bottom-left tracking-widest">COCO</span>
                </div>

                <div class="mt-3 flex items-center justify-center gap-2 opacity-50">
                    <span class="text-sm font-medium text-gray-400">&asymp; ${{ usdEquivalent }} USD</span>
                </div>
            </div>

            <div class="relative w-72 h-72 flex items-center justify-center"
                 @mousedown="startMining" @mouseup="stopMining" @mouseleave="stopMining"
                 @touchstart="startMining" @touchend="stopMining"
                 @contextmenu.prevent>

                <div class="absolute inset-0 rounded-full border border-primary/20 scale-50 opacity-0 transition-all duration-1000"
                     :class="isHolding ? 'animate-ripple' : ''"></div>

                <div class="absolute inset-0 bg-primary/10 blur-[80px] rounded-full transition-all duration-300"
                     :class="isHolding ? 'scale-110 opacity-100' : 'scale-90 opacity-40'"></div>

                <div class="w-48 h-48 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center relative z-10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.8)] active:scale-95 transition-all duration-200 cursor-pointer group overflow-hidden">

                    <div class="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-20 pointer-events-none"></div>

                    <div class="flex flex-col items-center gap-3 relative z-20">
                        <Zap :size="42"
                             class="transition-all duration-200"
                             :class="isHolding ? 'text-primary fill-primary/20 scale-110' : 'text-gray-700'" />

                        <span class="text-[9px] font-bold tracking-[0.2em] uppercase transition-colors"
                              :class="isHolding ? 'text-white animate-pulse' : 'text-gray-700'">
                            {{ isHolding ? $t('dashboard.sync') : $t('dashboard.hold') }}
                        </span>
                    </div>

                    <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="49" fill="none" stroke="#151515" stroke-width="1" />
                        <circle cx="50" cy="50" r="49" fill="none" stroke="var(--color-primary)" stroke-width="1.5"
                                stroke-dasharray="308" :stroke-dashoffset="isHolding ? 0 : 308"
                                class="transition-all duration-[3s] ease-out opacity-60" />
                    </svg>
                </div>
            </div>

            <p class="text-[10px] text-gray-600 font-mono text-center max-w-50 leading-relaxed transition-opacity"
               :class="isHolding ? 'opacity-0' : 'opacity-100'">
                {{ $t('dashboard.neural_pathway') }}
            </p>

        </div>

        <div class="px-6 pb-24 relative z-10">
            <div @click="showBoostModal = true"
                 class="bg-[#111] border border-white/5 rounded-2xl p-4 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden">

                <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                        <Lock :size="18" />
                    </div>
                    <div>
                        <h3 class="text-sm font-bold text-white">{{ $t('mining.unlock_title') }}</h3>
                        <p class="text-[10px] text-gray-500">Processing speed: <span class="text-red-400">{{ $t('mining.speed_limited') }}</span></p>
                    </div>
                </div>

                <div class="bg-white/5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors">
                    {{ $t('dashboard.sync') }}
                </div>
            </div>
        </div>

        <BaseModal :isOpen="showBoostModal" title="Hardware Limit Reached" @close="showBoostModal = false">
            <div class="space-y-6 text-center">
                <div class="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center relative">
                    <div class="absolute inset-0 border border-red-500/20 rounded-full animate-ping"></div>
                    <Battery :size="32" class="text-red-500" />
                </div>

                <div>
                    <h3 class="text-white font-bold mt-4 text-lg mb-2">{{ $t('mining.manual_inefficient') }}</h3>
                    <p class="text-sm mt-4 text-gray-400 leading-relaxed">{{ $t('mining.manual_desc') }}</p>
                </div>

                <div class="bg-[#151515] p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                    <div class="flex justify-between text-xs">
                        <span class="text-gray-500">{{ $t('mining.current_speed') }}</span>
                        <span class="text-red-400 font-mono">0.0001 COCO/s</span>
                    </div>
                    <div class="flex justify-between text-xs">
                        <span class="text-gray-500">{{ $t('mining.node_speed') }}</span>
                        <span class="text-primary font-bold font-mono">0.0500 COCO/s</span>
                    </div>
                    <div class="h-1.5 bg-[#0A0A0A] rounded-full mt-2 overflow-hidden flex">
                        <div class="w-[5%] bg-red-500 h-full"></div>
                        <div class="w-[95%] bg-primary/20 h-full relative">
                             <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>
                </div>

                <router-link to="/lab">
                    <button @click="showBoostModal = false;"
                        class="w-full bg-white text-black font-bold py-3.5 rounded-xl shadow-lg hover:bg-gray-200 active:scale-95 transition-all">
                        {{ $t('mining.get_node') }}
                    </button>
                </router-link>
            </div>
        </BaseModal>

    </div>
</template>

<style scoped>
@keyframes ripple {
    0% { transform: scale(0.8); opacity: 0.5; border-width: 2px; }
    100% { transform: scale(2.2); opacity: 0; border-width: 0px; }
}

.animate-ripple {
    animation: ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.animate-pulse-slow {
    animation-duration: 5s;
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
</style>
