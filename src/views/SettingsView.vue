<script setup lang="ts">
/**
 * Settings view with user profile display, language selector,
 * and placeholder system menu items (privacy, support, whitepaper).
 */

import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  HelpCircle,
  FileText,
  Check,
  Globe,
  X
} from 'lucide-vue-next';
import { useTelegramStore } from '@/stores/telegram';
import { useToastStore } from '@/stores/toast';

const { locale } = useI18n();
const router = useRouter();
const telegramStore = useTelegramStore();
const toast = useToastStore();

const showLanguageSheet = ref(false);

const languages = [
  { code: 'en', flag: 'us', name: 'English' },
  { code: 'ka', flag: 'ge', name: 'ქართული' },
  { code: 'ru', flag: 'ru', name: 'Русский' },
  { code: 'tr', flag: 'tr', name: 'Türkçe' },
  { code: 'hy', flag: 'am', name: 'Հայերեն' },
  { code: 'kk', flag: 'kz', name: 'Qazaqşa' },
];

const user = computed(() => {
    return telegramStore.user || {
        first_name: 'Unknown',
        username: 'agent_007',
        photo_url: null,
        id: '000000'
    };
});

const currentLang = computed(() => languages.find(l => l.code === locale.value));

const goBack = () => {
    telegramStore.hapticNotification('success');
    router.back();
};

const openLanguageSheet = () => {
    telegramStore.hapticNotification('success');
    showLanguageSheet.value = true;
};

const selectLanguage = (langCode: string) => {
    if (locale.value === langCode) return;

    locale.value = langCode;
    telegramStore.hapticNotification('success');
    localStorage.setItem('user_locale', langCode);
    showLanguageSheet.value = false;
};

const handleDummyAction = (action: string) => {
    telegramStore.hapticNotification('warning');
    toast.show(`${action} is restricted in your region`, 'warning');
};
</script>

<template>
    <div class="min-h-screen bg-black text-white font-sans select-none relative overflow-x-hidden">

        <div class="fixed top-[-10%] right-[-10%] w-100 h-100 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div class="px-6 pt-6 flex items-center relative z-20">
            <button
                @click="goBack"
                aria-label="Go back"
                class="w-10 h-10 rounded-xl bg-[#151515] border border-white/5 flex items-center justify-center text-gray-400 active:scale-95 active:bg-white/10 transition-all hover:text-white"
            >
                <ChevronLeft :size="20" />
            </button>
            <h1 class="text-lg font-bold ml-4 tracking-tight">{{ $t('settings.title') }}</h1>
        </div>

        <div class="px-6 pb-32">

            <div class="flex flex-col items-center mt-10 mb-12 relative">
                <div class="relative group">
                    <div class="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 opacity-60"></div>

                    <div class="w-28 h-28 rounded-full p-1 bg-linear-to-b from-white/10 to-black relative z-10 backdrop-blur-md">
                        <div class="w-full h-full rounded-full overflow-hidden bg-[#151515] relative flex items-center justify-center border border-white/5">
                            <img v-if="user.photo_url" :src="user.photo_url" class="w-full h-full object-cover" />
                            <User v-else :size="48" class="text-white/20" />
                        </div>
                    </div>

                    <div class="absolute bottom-1 right-1 bg-black p-1 rounded-full z-20 ring-4 ring-black">
                        <div class="bg-primary text-black rounded-full p-1 shadow-[0_0_10px_rgba(var(--color-primary),0.5)]">
                            <Shield :size="12" fill="currentColor" stroke-width="3" />
                        </div>
                    </div>
                </div>

                <h2 class="text-2xl font-bold mt-5 text-white tracking-tight">{{ user.first_name }}</h2>
                <div class="flex items-center gap-2 mt-1.5">
                    <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">@{{ user.username || 'urusername' }}</span>
                    <span class="w-1 h-1 rounded-full bg-gray-700"></span>
                    <span class="text-[10px] font-bold text-primary uppercase tracking-widest">{{ user.id?.toString().slice(0, 8) }}</span>
                </div>
            </div>

            <div class="mb-8">
                <h3 class="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-4 pl-1">{{ $t('settings.general') }}</h3>

                <button
                    @click="openLanguageSheet"
                    class="w-full bg-[#151515] border border-white/5 rounded-2xl p-4 flex items-center justify-between active:scale-[0.99] active:bg-white/10 transition-all group shadow-sm hover:shadow-md hover:border-white/10"
                >
                    <div class="flex items-center gap-4">
                        <div class="w-9 h-9 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                            <Globe :size="18" stroke-width="1.5" />
                        </div>
                        <span class="text-sm font-bold text-gray-200">{{ $t('settings.language') }}</span>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-2 bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                            <img
                                :src="`https://flagcdn.com/w20/${currentLang?.flag}.png`"
                                class="w-4 h-3 rounded-xs object-cover opacity-80 group-hover:opacity-100"
                            />
                            <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-300">{{ currentLang?.code }}</span>
                        </div>
                        <ChevronRight :size="16" class="text-gray-600 group-hover:text-gray-400 transition-colors" />
                    </div>
                </button>
            </div>

            <div class="mb-8">
                <h3 class="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-4 pl-1">System</h3>

                <div class="space-y-3">
                    <button @click="handleDummyAction('Privacy')" class="w-full bg-[#151515] border border-white/5 rounded-2xl p-4 flex items-center justify-between active:scale-[0.99] active:bg-white/10 transition-all group shadow-sm hover:shadow-md hover:border-white/10">
                        <div class="flex items-center gap-4">
                            <div class="w-9 h-9 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                <Shield :size="18" stroke-width="1.5" />
                            </div>
                            <span class="text-sm font-bold text-gray-200">{{ $t('settings.privacy') }}</span>
                        </div>
                        <ChevronRight :size="16" class="text-gray-600 group-hover:text-gray-400 transition-colors" />
                    </button>

                    <button @click="handleDummyAction('Support')" class="w-full bg-[#151515] border border-white/5 rounded-2xl p-4 flex items-center justify-between active:scale-[0.99] active:bg-white/10 transition-all group shadow-sm hover:shadow-md hover:border-white/10">
                        <div class="flex items-center gap-4">
                            <div class="w-9 h-9 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                <HelpCircle :size="18" stroke-width="1.5" />
                            </div>
                            <span class="text-sm font-bold text-gray-200">{{ $t('settings.support') }}</span>
                        </div>
                        <ChevronRight :size="16" class="text-gray-600 group-hover:text-gray-400 transition-colors" />
                    </button>

                    <button @click="handleDummyAction('Whitepaper')" class="w-full bg-[#151515] border border-white/5 rounded-2xl p-4 flex items-center justify-between active:scale-[0.99] active:bg-white/10 transition-all group shadow-sm hover:shadow-md hover:border-white/10">
                        <div class="flex items-center gap-4">
                            <div class="w-9 h-9 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                <FileText :size="18" stroke-width="1.5" />
                            </div>
                            <span class="text-sm font-bold text-gray-200">{{ $t('settings.whitepaper') }}</span>
                        </div>
                        <ChevronRight :size="16" class="text-gray-600 group-hover:text-gray-400 transition-colors" />
                    </button>
                </div>
            </div>

        </div>

        <transition name="fade">
            <div v-if="showLanguageSheet" class="fixed inset-0 z-50 flex items-end justify-center">
                <div @click="showLanguageSheet = false" class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"></div>

                <div class="w-full max-w-md bg-[#151515] border-t border-white/10 rounded-t-4xl p-6 relative z-10 animate-slide-up shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    <div class="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6"></div>

                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-white tracking-tight">{{ $t('settings.select_language') }}</h3>
                        <button @click="showLanguageSheet = false" aria-label="Close language selector" class="p-2 bg-white/5 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                            <X :size="18" />
                        </button>
                    </div>

                    <div class="space-y-2 max-h-[50vh] overflow-y-auto no-scrollbar pb-8">
                        <button
                            v-for="lang in languages"
                            :key="lang.code"
                            @click="selectLanguage(lang.code)"
                            class="w-full p-4 rounded-xl border flex items-center justify-between transition-all active:scale-[0.98] group"
                            :class="locale === lang.code
                                ? 'bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(var(--color-primary),0.05)]'
                                : 'bg-[#0A0A0A] border-white/5 hover:bg-white/5'"
                        >
                            <div class="flex items-center gap-4">
                                <img
                                    :src="`https://flagcdn.com/w40/${lang.flag}.png`"
                                    :alt="lang.name"
                                    class="w-8 h-6 rounded-md object-cover shadow-sm opacity-90 group-hover:opacity-100 transition-opacity"
                                >
                                <span class="font-bold text-sm tracking-wide"
                                      :class="locale === lang.code ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'">
                                    {{ lang.name }}
                                </span>
                            </div>

                            <div v-if="locale === lang.code" class="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-black shadow-sm">
                                <Check :size="14" stroke-width="3" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<style scoped>
.animate-slide-up {
    animation: slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>
