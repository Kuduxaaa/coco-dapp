<script setup lang="ts">
/**
 * Infrastructure marketplace for purchasing node tiers.
 * Displays available nodes with specs, ROI estimates,
 * and tracks owned node counts for income projections.
 */

import { ref, computed, type Component } from 'vue';
import { Cpu, Lock, Zap, Server, Plus, TrendingUp, Calculator, Activity, Gauge } from 'lucide-vue-next';
import { useToastStore } from '@/stores/toast';
import { useTelegramStore } from '@/stores/telegram';
import BaseModal from '@/components/ui/BaseModal.vue';

interface NodeTier {
    id: number;
    name: string;
    tag: string;
    price: number;
    priceDisplay: string;
    dailyUsd: number;
    cocoEarn: string;
    roi: string;
    desc: string;
    techSpecs?: { arch: string; power: string; efficiency: string };
    icon: Component;
    color: string;
    locked?: boolean;
}

const toast = useToastStore();
const telegramStore = useTelegramStore();

const showDetailModal = ref(false);
const selectedNode = ref<NodeTier | null>(null);

const ownedNodes = ref<Record<number, number>>({
    1: 1,
    2: 0,
    3: 0,
    4: 0
});

const nodes: NodeTier[] = [
    {
        id: 1,
        name: 'Nano Synapse',
        tag: 'Starter',
        price: 9,
        priceDisplay: '$9.00',
        dailyUsd: 0.18,
        cocoEarn: '0.45',
        roi: '22 Days',
        desc: 'Entry-level neural processing unit. Works silently in the background to validate micro-transactions.',
        techSpecs: { arch: 'Cortex-A1', power: '2W', efficiency: '98%' },
        icon: Zap,
        color: 'text-primary'
    },
    {
        id: 2,
        name: 'Micro Neural',
        tag: 'Bestseller',
        price: 29,
        priceDisplay: '$29.00',
        dailyUsd: 0.65,
        cocoEarn: '3.20',
        roi: '30 Days',
        desc: 'Advanced multi-core system. Capable of handling parallel validation tasks with higher reward output.',
        techSpecs: { arch: 'Neural-X2', power: '15W', efficiency: '99%' },
        icon: Server,
        color: 'text-blue-400'
    },
    {
        id: 3,
        name: 'Macro Cortex',
        tag: 'Business',
        price: 99,
        priceDisplay: '$99.00',
        dailyUsd: 2.50,
        cocoEarn: '15.50',
        roi: '35 Days',
        desc: 'Industrial grade node cluster. Designed for maximum passive income generation.',
        techSpecs: { arch: 'Quantum-V', power: '450W', efficiency: '99.9%' },
        icon: Cpu,
        color: 'text-purple-400'
    },
    {
        id: 4,
        name: 'Quantum Core',
        tag: 'VIP',
        price: 999,
        priceDisplay: 'INVITE ONLY',
        dailyUsd: 0,
        cocoEarn: '???',
        roi: '???',
        desc: 'Restricted access.',
        locked: true,
        icon: Lock,
        color: 'text-gray-500'
    },
];

const totalDailyIncome = computed(() => {
    let total = 0;
    nodes.forEach(node => {
        const count = ownedNodes.value[node.id] ?? 0;
        total += count * node.dailyUsd;
    });
    return total.toFixed(2);
});

const monthlyProjection = computed(() => {
    return (Number(totalDailyIncome.value) * 30).toFixed(2);
});

const openNodeDetails = (node: NodeTier) => {
    telegramStore.hapticNotification('success');
    if (node.locked) {
        toast.show('Access Restricted: Leaders Only', 'error');
        return;
    }
    selectedNode.value = node;
    showDetailModal.value = true;
};

const handlePurchase = () => {
    if (!selectedNode.value) return;
    telegramStore.hapticNotification('success');

    const currentCount = ownedNodes.value[selectedNode.value.id] ?? 0;
    ownedNodes.value[selectedNode.value.id] = currentCount + 1;

    showDetailModal.value = false;
    toast.show(`+1 ${selectedNode.value.name} deployed successfully`, 'success');
};
</script>

<template>
    <div class="min-h-screen bg-black text-white p-6 pb-32 pt-12 flex flex-col relative font-sans">

        <div class="relative z-10 mb-8">
            <div class="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
                <div class="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[60px] rounded-full pointer-events-none"></div>

                <div class="flex justify-between items-start mb-4">
                    <div>
                        <span class="text-[11px] text-gray-400 uppercase font-bold tracking-widest flex items-center gap-1.5 mb-1">
                            <Activity :size="12" class="text-primary" /> {{ $t('lab.daily_income') }}
                        </span>
                        <div class="flex items-baseline gap-1">
                            <span class="text-2xl font-bold text-gray-500">$</span>
                            <span class="text-5xl font-bold text-white tracking-tight">{{ totalDailyIncome }}</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                    <span class="text-xs text-gray-400 font-medium">{{ $t('lab.monthly_projection') }}</span>
                    <span class="text-sm font-bold text-primary flex items-center gap-2">
                        ${{ monthlyProjection }}
                        <TrendingUp :size="14" />
                    </span>
                </div>
            </div>
        </div>

        <h2 class="text-sm font-bold text-gray-500 mb-4 px-2 uppercase tracking-wider text-[10px]">Available Infrastructure</h2>

        <div class="space-y-4">
            <div
                v-for="node in nodes"
                :key="node.id"
                class="relative bg-[#0F0F0F] border border-white/5 rounded-3xl p-5 transition-all active:scale-[0.98] group"
                :class="(ownedNodes[node.id] ?? 0) > 0 ? 'border-primary/20 bg-primary/5' : ''"
                @click="openNodeDetails(node)"
            >
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl flex items-center justify-center relative transition-colors duration-300"
                             :class="(ownedNodes[node.id] ?? 0) > 0 ? 'bg-primary text-black' : 'bg-[#1A1A1A] text-gray-500'">
                            <component :is="node.icon" :size="24" stroke-width="1.5" />

                            <div v-if="(ownedNodes[node.id] ?? 0) > 0"
                                 class="absolute -top-2 -right-2 bg-[#0F0F0F] text-primary text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border border-primary/30 shadow-lg">
                                x{{ ownedNodes[node.id] ?? 0 }}
                            </div>
                        </div>

                        <div>
                            <h3 class="font-bold text-base text-white flex items-center gap-2 mb-1">
                                {{ node.name }}
                            </h3>
                            <div class="flex items-center gap-2">
                                <span v-if="node.tag" class="text-[9px] font-bold px-2 py-0.5 rounded-full border"
                                      :class="(ownedNodes[node.id] ?? 0) > 0 ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white/5 border-white/10 text-gray-500'">
                                    {{ node.tag }}
                                </span>
                                <span v-if="node.dailyUsd > 0" class="text-[10px] text-gray-400">
                                    ${{ node.dailyUsd }}/day
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="pl-2">
                        <button v-if="!node.locked" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
                            <Plus :size="18" />
                        </button>
                        <Lock v-else :size="18" class="text-gray-600 mr-2" />
                    </div>
                </div>
            </div>
        </div>

        <BaseModal
            :isOpen="showDetailModal"
            :title="selectedNode?.name"
            @close="showDetailModal = false"
        >
            <div v-if="selectedNode" class="space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-400 mb-1">{{ $t('lab.unit_price') }}</p>
                        <p class="text-2xl font-bold text-white">{{ selectedNode.priceDisplay }}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-400 mb-1">{{ $t('lab.daily_revenue') }}</p>
                        <p class="text-2xl font-bold text-primary">+${{ selectedNode.dailyUsd }}</p>
                    </div>
                </div>

                <div v-if="selectedNode.techSpecs" class="bg-[#151515] rounded-2xl p-4 border border-white/5">
                    <h4 class="text-[10px] uppercase font-bold text-gray-500 mb-3 flex items-center gap-1">
                        <Gauge :size="12" /> {{ $t('lab.tech_specs') }}
                    </h4>
                    <div class="grid grid-cols-3 gap-2 text-center">
                        <div class="bg-black/40 rounded-lg p-2">
                            <span class="text-[9px] text-gray-500 block">{{ $t('lab.architecture') }}</span>
                            <span class="text-xs font-bold text-white">{{ selectedNode.techSpecs.arch }}</span>
                        </div>
                        <div class="bg-black/40 rounded-lg p-2">
                            <span class="text-[9px] text-gray-500 block">{{ $t('lab.power') }}</span>
                            <span class="text-xs font-bold text-white">{{ selectedNode.techSpecs.power }}</span>
                        </div>
                        <div class="bg-black/40 rounded-lg p-2">
                            <span class="text-[9px] text-gray-500 block">{{ $t('lab.efficiency') }}</span>
                            <span class="text-xs font-bold text-primary">{{ selectedNode.techSpecs.efficiency }}</span>
                        </div>
                    </div>
                </div>

                <p class="text-gray-400 text-sm leading-relaxed border-l-2 border-white/10 pl-3">
                    {{ selectedNode.desc }}
                </p>

                <div class="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Calculator :size="16" />
                    </div>
                    <div>
                        <p class="text-xs text-primary font-bold">{{ $t('lab.roi_estimator') }}</p>
                        <p class="text-[11px] text-gray-400">
                            <i18n-t keypath="lab.roi_description" tag="p">
                                <template #days>
                                    <span class="text-white font-bold">
                                        {{ selectedNode.roi }}
                                    </span>
                                </template>
                            </i18n-t>
                        </p>
                    </div>
                </div>

                <button
                    @click="handlePurchase"
                    class="w-full py-4 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 active:scale-95"
                >
                    <Plus :size="16" />
                    {{ $t('lab.deploy', { price: selectedNode.priceDisplay }) }}
                </button>
            </div>
        </BaseModal>

    </div>
</template>
