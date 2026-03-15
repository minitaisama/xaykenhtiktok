<script setup lang="ts">
import { useToast } from '../../composables/useToast'
import { X } from 'lucide-vue-next'

const { toasts } = useToast()

const typeStyles: Record<string, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="typeStyles[toast.type]"
        class="px-4 py-3 rounded-lg text-white text-sm shadow-lg flex items-center gap-2 min-w-64"
      >
        <span class="flex-1">{{ toast.message }}</span>
        <button @click="toasts.splice(toasts.indexOf(toast), 1)" class="opacity-70 hover:opacity-100 cursor-pointer">
          <X :size="14" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active { transition: all 0.3s ease; }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from { transform: translateX(100%); opacity: 0; }
.toast-leave-to { transform: translateX(100%); opacity: 0; }
</style>
