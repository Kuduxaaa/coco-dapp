<script setup lang="ts">
/**
 * Toast notification component with type-based styling.
 * Renders at the bottom of the viewport with an animated
 * progress bar and auto-dismiss behavior.
 */

import { computed } from 'vue';
import { useToastStore } from '@/stores/toast';
import { Check, AlertTriangle, X, Info } from 'lucide-vue-next';

const store = useToastStore();

const config = computed(() => {
    switch (store.type) {
        case 'error':
            return {
                icon: X,
                border: 'border-red-500/10',
                bgFallback: 'bg-[#050505]',
                tint: 'bg-red-500/5',
                text: 'text-red-500',
                iconColor: 'text-red-400',
                progress: 'bg-red-500'
            };
        case 'warning':
            return {
                icon: AlertTriangle,
                border: 'border-amber-500/10',
                bgFallback: 'bg-[#050505]',
                tint: 'bg-amber-500/5',
                text: 'text-amber-500',
                iconColor: 'text-amber-400',
                progress: 'bg-amber-500'
            };
        case 'info':
            return {
                icon: Info,
                border: 'border-blue-500/10',
                bgFallback: 'bg-[#050505]',
                tint: 'bg-blue-500/5',
                text: 'text-blue-500',
                iconColor: 'text-blue-400',
                progress: 'bg-blue-500'
            };
        default:
            return {
                icon: Check,
                border: 'border-primary/20',
                bgFallback: 'bg-[#050505]',
                tint: 'bg-primary/5',
                text: 'text-primary',
                iconColor: 'text-primary',
                progress: 'bg-primary'
            };
    }
});
</script>

<template>
    <Transition
        enter-active-class="transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1)"
        enter-from-class="translate-y-8 opacity-0 scale-95"
        enter-to-class="translate-y-0 opacity-100 scale-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="translate-y-0 opacity-100 scale-100"
        leave-to-class="translate-y-8 opacity-0 scale-95"
    >
        <div
            v-show="store.visible"
            class="fixed bottom-24 left-0 right-0 z-100 flex justify-center pointer-events-none px-6"
        >
            <div
                class="gpu-accelerated relative w-full max-w-[320px] rounded-[18px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex items-center gap-3 overflow-hidden border backdrop-blur-2xl"
                :class="config.border"
            >
                <div class="absolute inset-0 opacity-95" :class="config.bgFallback"></div>
                <div class="absolute inset-0 opacity-20" :class="config.tint"></div>

                <div class="relative z-10 shrink-0">
                    <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                        <component :is="config.icon" :size="16" stroke-width="2.5" :class="config.iconColor" />
                    </div>
                </div>

                <div class="flex flex-col flex-1 min-w-0 relative z-10 gap-0.5">
                    <span class="text-[9px] font-bold tracking-widest uppercase opacity-60 font-mono" :class="config.text">
                        {{ store.type }}
                    </span>
                    <span class="text-white/90 text-xs font-medium leading-snug truncate pr-2">
                        {{ store.message }}
                    </span>
                </div>

                <div
                    class="absolute bottom-0 left-0 h-[1.5px] w-full origin-left animate-progress opacity-60 z-10"
                    :class="config.progress"
                ></div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.gpu-accelerated {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
}

@keyframes shrink {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
}

.animate-progress {
    animation: shrink 3000ms linear forwards;
}
</style>
