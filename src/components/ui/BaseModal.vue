<script setup lang="ts">
/**
 * Reusable modal dialog component.
 * Integrates with Telegram's back button, prevents body scroll
 * when open, and supports backdrop-click dismissal.
 */

import { onUnmounted, watch } from 'vue';
import { useTelegramStore } from '@/stores/telegram';

const props = defineProps<{
    isOpen: boolean;
    title?: string;
}>();

const emit = defineEmits(['close']);
const telegramStore = useTelegramStore();

const close = () => {
    telegramStore.hapticSelection();
    emit('close');
};

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
};

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeydown);
        telegramStore.showBackButton(close);
    } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeydown);
        telegramStore.hideBackButton(close);
    }
});

onUnmounted(() => {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    telegramStore.hideBackButton(close);
});
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                role="dialog"
                aria-modal="true"
                :aria-label="title"
                class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
                @click="close"
            >
                <Transition
                    enter-active-class="transition duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)"
                    enter-from-class="opacity-0 scale-95 translate-y-4"
                    enter-to-class="opacity-100 scale-100 translate-y-0"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="opacity-100 scale-100 translate-y-0"
                    leave-to-class="opacity-0 scale-95 translate-y-4"
                >
                    <div
                        v-if="isOpen"
                        @click.stop
                        class="w-full max-w-sm bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 relative shadow-2xl shadow-black/50 overflow-hidden"
                    >
                        <div class="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none rounded-full"></div>

                        <div class="flex justify-between items-center mb-6 relative z-10">
                            <h3 class="text-lg font-bold text-white tracking-wide">{{ title }}</h3>

                            <button
                                @click="close"
                                aria-label="Close dialog"
                                class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                &#10005;
                            </button>
                        </div>

                        <div class="relative z-10">
                            <slot />
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
