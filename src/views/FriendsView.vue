<script setup lang="ts">
/**
 * Referral network (Syndicate) view showing affiliate program details,
 * top operators list, network stats, and invite-link sharing.
 */

import { ref } from 'vue';
import { Users, Copy, Gift, ChevronRight, Zap, TrendingUp, ShieldCheck, Info, CheckCircle2 } from 'lucide-vue-next';
import { useToastStore } from '@/stores/toast';
import { useTelegramStore } from '@/stores/telegram';
import BaseModal from '@/components/ui/BaseModal.vue';

const toast = useToastStore();
const telegramStore = useTelegramStore();

const referralLink = 't.me/coco_bot?start=r_12345';
const showProgramModal = ref(false);

const stats = {
    networkSize: 128,
    directBonus: '450 COCO',
    passiveIncome: '12.5 COCO'
};

const friends = [
    { name: 'Luka M.', tier: 'Quantum', tierColor: 'text-orange-300 bg-orange-500/10 border-orange-500/20', earnings: '+1,200', status: 'Whale' },
    { name: 'Nikoloz G.', tier: 'Macro', tierColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20', earnings: '+120', status: 'Active' },
    { name: 'Mariam S.', tier: 'Micro', tierColor: 'text-blue-300 bg-blue-500/10 border-blue-500/20', earnings: '+85', status: 'Active' },
    { name: 'David B.', tier: 'Nano', tierColor: 'text-primary bg-primary/5 border-primary/20', earnings: '0', status: 'Sleep' },
    { name: 'Giorgi K.', tier: 'Nano', tierColor: 'text-primary bg-primary/5 border-primary/20', earnings: '0', status: 'Sleep' },
];

const copyLink = async () => {
    telegramStore.hapticNotification('success');
    try {
        await navigator.clipboard.writeText(referralLink);
        toast.show('Syndicate Link Copied', 'success');
    } catch {
        toast.show('Failed to copy link', 'error');
    }
};

const openProgramDetails = () => {
    telegramStore.hapticNotification('success');
    showProgramModal.value = true;
};
</script>

<template>
    <div class="min-h-screen bg-black text-white flex flex-col relative font-sans overflow-hidden">

        <div class="fixed top-0 right-0 w-75 h-75 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div class="relative z-10 px-6 pt-10 pb-6 flex items-center justify-between flex-none">
            <div class="flex items-center gap-4">
                <div class="w-11 h-11 bg-[#151515] border border-white/10 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/50">
                    <Users :size="20" stroke-width="1.5" />
                </div>
                <div>
                    <h1 class="text-lg font-bold text-white leading-none tracking-tight">Syndicate</h1>
                    <div class="flex items-center gap-1.5 mt-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        <p class="text-gray-500 text-[11px] font-medium">Empire Growth</p>
                    </div>
                </div>
            </div>

            <div class="bg-[#151515] border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-400 flex items-center gap-1.5 shadow-sm">
                <Users :size="10" />
                {{ stats.networkSize }} Agents
            </div>
        </div>

        <div class="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">

            <div
                @click="openProgramDetails"
                class="relative bg-linear-to-b from-[#151515] to-[#0A0A0A] border border-white/10 rounded-[28px] p-1 overflow-hidden shadow-2xl mb-8 group active:scale-[0.99] transition-transform duration-300 cursor-pointer"
            >
                <div class="bg-[#0A0A0A]/50 rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm">

                    <Info :size="14" class="text-gray-500 float-end" />
                    <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 bg-primary/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors"></div>

                    <div class="flex flex-col items-center text-center mb-6 relative z-10">
                        <div class="bg-primary/10 p-3.5 rounded-2xl border border-primary/10 mb-3 shadow-[0_0_20px_rgba(var(--color-primary),0.15)] ring-1 ring-primary/20">
                            <Gift :size="28" class="text-primary" />
                        </div>
                        <div class="flex items-center gap-2 mb-1">
                            <h2 class="text-base font-bold text-white">{{ $t('friends.dual_incentive') }}</h2>
                        </div>
                        <p class="text-[11px] text-gray-400 font-medium max-w-55 leading-relaxed">
                            {{ $t('friends.tap_to_learn') }}
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-3 mb-5">
                        <div class="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col items-center gap-1">
                            <span class="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{{ $t('syndicate.direct') }}</span>
                            <div class="flex items-center gap-1.5">
                                <Zap :size="14" class="text-yellow-400 fill-yellow-400/20" />
                                <span class="text-xl font-bold text-white">15%</span>
                            </div>
                        </div>
                        <div class="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col items-center gap-1">
                            <span class="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{{ $t('syndicate.lifetime') }}</span>
                            <div class="flex items-center gap-1.5">
                                <TrendingUp :size="14" class="text-primary" />
                                <span class="text-xl font-bold text-white">5%</span>
                            </div>
                        </div>
                    </div>

                    <button
                        @click.stop="copyLink"
                        aria-label="Copy invite link to clipboard"
                        class="w-full bg-white text-black font-bold h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 active:scale-[0.97] transition-all shadow-lg"
                    >
                        <Copy :size="16" />
                        <span class="text-xs tracking-wide">{{ $t('friends.copy_link') }}</span>
                    </button>
                </div>
            </div>

            <div class="flex items-center gap-3 mb-8">
                <div class="flex-1 bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-20">
                    <span class="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{{ $t('friends.total_earned') }}</span>
                    <p class="text-base font-bold text-white tracking-tight">{{ stats.directBonus }}</p>
                </div>
                <div class="flex-1 bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-20 relative overflow-hidden group">
                    <div class="absolute right-0 top-0 w-12 h-12 bg-primary/10 blur-xl rounded-full group-hover:bg-primary/20 transition-colors"></div>
                    <span class="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{{ $t('friends.passive_flow') }}</span>
                    <p class="text-base font-bold text-primary tracking-tight">+{{ stats.passiveIncome }}</p>
                </div>
            </div>

            <div class="mb-4">
                <div class="flex items-center justify-between mb-4 px-1">
                    <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">{{ $t('friends.top_operators') }}</h3>
                    <div class="flex items-center gap-1 text-[9px] text-primary font-bold bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">
                        <ShieldCheck :size="10" /> {{ $t('friends.verified') }}
                    </div>
                </div>

                <div class="space-y-2">
                    <div
                        v-for="(friend, i) in friends"
                        :key="i"
                        class="flex items-center justify-between p-3.5 rounded-2xl bg-[#0F0F0F] border border-white/5 active:scale-[0.98] active:bg-[#151515] transition-all group"
                    >
                        <div class="flex items-center gap-3.5">
                            <div class="relative">
                                <div class="w-10 h-10 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                                    {{ friend.name.charAt(0) }}
                                </div>
                                <div v-if="friend.status !== 'Sleep'" class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#0F0F0F] rounded-full flex items-center justify-center">
                                    <div class="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                </div>
                            </div>

                            <div>
                                <div class="flex items-center gap-2">
                                    <p class="text-sm font-bold text-white">{{ friend.name }}</p>
                                    <span class="text-[8px] px-1.5 py-px rounded font-bold border tracking-wide uppercase" :class="friend.tierColor">
                                        {{ friend.tier }}
                                    </span>
                                </div>
                                <p class="text-[10px] text-gray-500 font-medium mt-0.5 flex items-center gap-1">
                                    <span :class="friend.status === 'Whale' ? 'text-purple-400' : ''">{{ friend.status }}</span>
                                    <span class="w-0.5 h-0.5 bg-gray-600 rounded-full"></span>
                                    <span class="text-white font-bold">{{ friend.earnings }} COCO</span>
                                </p>
                            </div>
                        </div>

                        <ChevronRight :size="16" class="text-gray-600 opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </div>

        <BaseModal
            :isOpen="showProgramModal"
            title="Affiliate Logic"
            @close="showProgramModal = false"
        >
            <div class="space-y-6">
                <div class="text-center">
                    <p class="text-gray-400 text-sm leading-relaxed">{{ $t('friends.affiliate_desc') }}</p>
                </div>

                <div class="bg-[#151515] rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                    <div class="flex items-start gap-4 relative z-10">
                        <div class="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
                            <Zap :size="20" class="fill-yellow-500/20" />
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-sm mb-1">{{ $t('friends.direct_bonus') }}</h4>
                            <p class="text-xs text-gray-400 leading-snug">{{ $t('friends.direct_bonus_desc') }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-[#151515] rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 blur-2xl rounded-full pointer-events-none"></div>

                    <div class="flex items-start gap-4 relative z-10">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <TrendingUp :size="20" />
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-sm mb-1">{{ $t('friends.lifetime_passive') }}</h4>
                            <p class="text-xs text-gray-400 leading-snug">
                                {{ $t('friends.lifetime_passive_desc') }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2 bg-white/5 p-3 rounded-xl">
                    <CheckCircle2 :size="14" class="text-gray-500" />
                    <p class="text-[10px] text-gray-500">
                        {{ $t('friends.rewards_note') }}
                    </p>
                </div>

                <button
                    @click="showProgramModal = false"
                    class="w-full py-3.5 rounded-xl font-bold text-sm bg-[#1A1A1A] text-white border border-white/10 hover:bg-[#222]"
                >
                    {{ $t('friends.close') }}
                </button>
            </div>
        </BaseModal>

    </div>
</template>

