/**
 * Pinia store for Telegram WebApp integration.
 * Centralizes all Telegram platform access: user data, version checks,
 * haptic feedback, back button management, and theme configuration.
 * Falls back to mock data when running outside Telegram.
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TelegramUser } from '@/types/telegram';

export const useTelegramStore = defineStore('telegram', () => {
    const user = ref<TelegramUser | null>(null);
    const isTelegram = ref(false);
    const version = ref('unknown');
    const platform = ref('unknown');

    /** Check if the current Telegram WebApp version meets the minimum requirement. */
    const supports = (minVersion: string): boolean => {
        if (version.value === 'unknown') return false;
        if (window.Telegram?.WebApp?.isVersionAtLeast) {
            return window.Telegram.WebApp.isVersionAtLeast(minVersion);
        }
        const current = version.value.split('.').map(Number);
        const target = minVersion.split('.').map(Number);
        for (let i = 0; i < Math.max(current.length, target.length); i++) {
            const a = current[i] ?? 0;
            const b = target[i] ?? 0;
            if (a > b) return true;
            if (a < b) return false;
        }
        return true;
    };

    /** Initialize Telegram WebApp or fall back to mock user data. */
    const init = () => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;

            tg.ready();
            version.value = tg.version;
            platform.value = tg.platform;

            try { tg.expand(); } catch { /* not supported on all platforms */ }

            if (supports('6.1')) {
                try {
                    tg.setHeaderColor('#000000');
                    tg.setBackgroundColor('#000000');
                    tg.setBottomBarColor('#000000');
                } catch { /* color API may be unavailable */ }
            }

            if (tg.initDataUnsafe?.user) {
                user.value = tg.initDataUnsafe.user;
                isTelegram.value = true;
            }
        } else {
            user.value = {
                id: 1,
                first_name: 'Ronin',
                username: 'tryronin',
                photo_url: ''
            };
        }
    };

    /** Trigger an impact haptic feedback event. */
    const haptic = (style: 'light' | 'medium' | 'heavy' = 'medium') => {
        if (supports('6.1') && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
        }
    };

    /** Trigger a notification haptic feedback event. */
    const hapticNotification = (type: 'error' | 'success' | 'warning') => {
        if (supports('6.1') && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
        }
    };

    /** Trigger a selection-change haptic feedback event. */
    const hapticSelection = () => {
        if (supports('6.1') && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.selectionChanged();
        }
    };

    /** Show the Telegram back button and bind a close callback. */
    const showBackButton = (callback: () => void) => {
        if (supports('6.1') && window.Telegram?.WebApp?.BackButton) {
            window.Telegram.WebApp.BackButton.show();
            window.Telegram.WebApp.BackButton.onClick(callback);
        }
    };

    /** Hide the Telegram back button and unbind its callback. */
    const hideBackButton = (callback: () => void) => {
        if (supports('6.1') && window.Telegram?.WebApp?.BackButton) {
            window.Telegram.WebApp.BackButton.hide();
            window.Telegram.WebApp.BackButton.offClick(callback);
        }
    };

    return {
        user,
        isTelegram,
        version,
        platform,
        init,
        supports,
        haptic,
        hapticNotification,
        hapticSelection,
        showBackButton,
        hideBackButton
    };
});
