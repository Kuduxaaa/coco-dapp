<script setup lang="ts">
/**
 * Wallet dashboard displaying total balance, individual asset holdings,
 * mini sparkline charts, and quick-action buttons (send, receive, swap, scan).
 */

import { ref } from 'vue';
import { useTelegramStore } from '@/stores/telegram';
import { useToastStore } from '@/stores/toast';
import { useChart } from '@/composables/useChart';
import {
    RefreshCw,
    TrendingUp,
    Wallet,
    Zap,
    Gem,
    CircleDollarSign,
    ArrowUpRight,
    ArrowDownLeft,
    ScanLine,
    Eye,
    EyeOff
} from 'lucide-vue-next';

const telegramStore = useTelegramStore();
const toast = useToastStore();
const { getSmoothPath, generateFakeData } = useChart();

const totalBalance = ref('12,450.00');
const profit = ref('+$1,240.50 (12%)');
const hideBalance = ref(false);

const mainChartData = generateFakeData(20, 'up');
const mainChartPath = getSmoothPath(mainChartData, 300, 100);

const assets = ref([
    {
        id: 'coco',
        symbol: 'COCO',
        name: 'Coco Network',
        amount: '15,000',
        value: '$8,450.00',
        price: '$0.563',
        change: '+15.2%',
        icon: Zap,
        isNative: true,
        chartPath: getSmoothPath(generateFakeData(15, 'up'), 50, 20)
    },
    {
        id: 'ton',
        symbol: 'TON',
        name: 'Toncoin',
        amount: '540.20',
        value: '$2,800.00',
        price: '$5.18',
        change: '+2.4%',
        icon: Gem,
        isNative: false,
        chartPath: getSmoothPath(generateFakeData(15, 'flat'), 50, 20)
    },
    {
        id: 'usdt',
        symbol: 'USDT',
        name: 'Tether USD',
        amount: '1,200.00',
        value: '$1,200.00',
        price: '$1.00',
        change: '0.0%',
        icon: CircleDollarSign,
        isNative: false,
        chartPath: getSmoothPath(generateFakeData(10, 'flat'), 50, 20)
    },
]);

const handleAction = (action: string) => {
    telegramStore.hapticNotification('warning');
    toast.show(`${action} feature coming soon`, 'warning');
};

const toggleBalance = () => {
    telegramStore.hapticNotification('success');
    hideBalance.value = !hideBalance.value;
};
</script>

<template>
    <div class="min-h-screen bg-black text-white flex flex-col relative font-sans overflow-hidden">

        <div class="fixed -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div class="relative z-10 px-5 pt-8 pb-6 flex-none">

            <div class="flex items-center justify-between mb-4 px-1">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <Wallet :size="16" class="text-white" />
                    </div>
                    <span class="font-bold text-lg">{{ $t('assets.wallet') }}</span>
                </div>
                <button @click="toggleBalance" class="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-500 transition-colors">
                    <component :is="hideBalance ? EyeOff : Eye" :size="18" />
                </button>
            </div>

            <div class="relative w-full h-48 bg-linear-to-br from-[#151515] to-[#0A0A0A] border border-white/10 rounded-[28px] p-6 overflow-hidden shadow-2xl group">
                <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[60px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>

                <div class="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <span class="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1 block">{{ $t('assets.total_balance') }}</span>
                        <div class="flex items-baseline gap-1">
                            <span class="text-2xl font-bold text-gray-500">$</span>
                            <span class="text-4xl font-bold text-white tracking-tight">
                                {{ hideBalance ? '******' : totalBalance }}
                            </span>
                        </div>
                    </div>

                    <div class="absolute bottom-0 left-0 right-0 h-24 opacity-30 pointer-events-none">
                         <svg class="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="cardChart" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.4"/>
                                    <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0"/>
                                </linearGradient>
                            </defs>
                            <path :d="mainChartPath"
                                  fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" />
                            <path :d="`${mainChartPath} V 100 H 0 Z`"
                                  fill="url(#cardChart)" />
                        </svg>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-xl">
                            <TrendingUp :size="14" class="text-primary" />
                            <span class="text-primary text-xs font-bold">{{ hideBalance ? '***' : profit }}</span>
                        </div>
                        <div class="text-[10px] text-gray-500 font-mono">
                            {{ $t('assets.updated') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-5 mb-8 flex-none">
            <div class="grid grid-cols-4 gap-3">
                <button @click="handleAction('Send')" class="flex flex-col items-center gap-2 group">
                    <div class="w-14 h-14 rounded-[20px] bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-white group-active:scale-95 transition-all shadow-lg group-hover:bg-white/10">
                        <ArrowUpRight :size="22" stroke-width="1.5" />
                    </div>
                    <span class="text-[10px] font-bold text-gray-400">{{ $t('assets.send') }}</span>
                </button>

                <button @click="handleAction('Receive')" class="flex flex-col items-center gap-2 group">
                    <div class="w-14 h-14 rounded-[20px] bg-primary text-black flex items-center justify-center group-active:scale-95 transition-all shadow-[0_0_20px_rgba(var(--color-primary),0.2)] hover:brightness-110">
                        <ArrowDownLeft :size="22" stroke-width="2" />
                    </div>
                    <span class="text-[10px] font-bold text-white">{{ $t('assets.receive') }}</span>
                </button>

                <button @click="handleAction('Swap')" class="flex flex-col items-center gap-2 group">
                    <div class="w-14 h-14 rounded-[20px] bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-white group-active:scale-95 transition-all shadow-lg group-hover:bg-white/10">
                        <RefreshCw :size="20" stroke-width="1.5" />
                    </div>
                    <span class="text-[10px] font-bold text-gray-400">{{ $t('assets.swap') }}</span>
                </button>

                <button @click="handleAction('Scan')" class="flex flex-col items-center gap-2 group">
                    <div class="w-14 h-14 rounded-[20px] bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-white group-active:scale-95 transition-all shadow-lg group-hover:bg-white/10">
                        <ScanLine :size="20" stroke-width="1.5" />
                    </div>
                    <span class="text-[10px] font-bold text-gray-400">{{ $t('assets.scan') }}</span>
                </button>
            </div>
        </div>

        <div class="bg-[#0F0F0F] rounded-t-4xl border-t border-white/5 px-5 pt-6 pb-32 flex-1 relative z-20">
            <div class="flex items-center justify-between mb-4 px-1">
                <h3 class="text-sm font-bold text-white">{{ $t('assets.assets') }}</h3>
                <button class="text-[11px] text-primary font-bold hover:opacity-80 transition-opacity">{{ $t('assets.manage') }}</button>
            </div>

            <div class="space-y-3">
                <div
                    v-for="asset in assets"
                    :key="asset.id"
                    class="bg-[#151515] border border-white/5 rounded-2xl p-3.5 flex items-center justify-between active:scale-[0.98] transition-transform"
                >
                    <div class="flex items-center gap-3.5">
                        <div class="relative">
                            <div
                                class="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                                :class="asset.isNative ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-[#0A0A0A] border-white/5 text-white'"
                            >
                                <component :is="asset.icon" :size="20" stroke-width="1.5" />
                            </div>
                            <div v-if="asset.isNative" class="absolute -bottom-1 -right-1 bg-[#151515] rounded-full p-0.5">
                                <div class="bg-primary w-2.5 h-2.5 rounded-full border border-[#151515]"></div>
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center gap-1.5">
                                <h4 class="font-bold text-sm text-white">{{ asset.symbol }}</h4>
                            </div>
                            <p class="text-[11px] text-gray-500 font-medium mt-0.5">
                                {{ hideBalance ? '****' : asset.amount }}
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <div class="w-12 h-6 opacity-50">
                            <svg class="w-full h-full" viewBox="0 0 50 20" preserveAspectRatio="none">
                                <path :d="asset.chartPath" fill="none"
                                      :stroke="asset.change.startsWith('+') ? 'var(--color-primary)' : '#ef4444'"
                                      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>

                        <div class="text-right min-w-15">
                            <p class="font-bold text-white text-sm tracking-tight">
                                {{ hideBalance ? '****' : asset.value }}
                            </p>
                            <p class="text-[10px] font-medium"
                               :class="asset.change.startsWith('+') ? 'text-green-500' : 'text-red-500'">
                                {{ asset.change }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <button @click="toast.show($t('assets.import_token'), 'info')" class="w-full mt-4 py-3 rounded-xl border border-dashed border-white/10 text-gray-600 text-xs font-bold hover:bg-white/5 transition-colors">
                {{ $t('assets.import_token') }}
            </button>
        </div>

    </div>
</template>
