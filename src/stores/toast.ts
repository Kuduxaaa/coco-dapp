/**
 * Pinia store for managing toast notification state.
 * Supports success, error, warning, and info variants
 * with auto-dismiss and haptic feedback.
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useTelegramStore } from '@/stores/telegram';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export const useToastStore = defineStore('toast', () => {
    const visible = ref(false);
    const message = ref('');
    const type = ref<ToastType>('success');
    let timer: ReturnType<typeof setTimeout> | null = null;

    /** Display a toast message with optional type and duration. */
    const show = (msg: string, t: ToastType = 'success', duration = 3000) => {
        visible.value = false;
        if (timer) clearTimeout(timer);

        setTimeout(() => {
            message.value = msg;
            type.value = t;
            visible.value = true;

            const telegramStore = useTelegramStore();
            telegramStore.haptic(t === 'error' ? 'heavy' : 'light');

            timer = setTimeout(() => {
                visible.value = false;
            }, duration);
        }, 100);
    };

    return { visible, message, type, show };
});
