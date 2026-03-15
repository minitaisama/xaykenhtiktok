<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/projects': 'Quản lý dự án',
  '/pricing': 'Quản lý báo giá',
  '/settings': 'Cài đặt',
  '/contact': 'Liên hệ',
  '/media': 'Media Library',
}
</script>

<template>
  <header class="h-16 bg-white border-b border-gray-200 flex items-center px-6">
    <h2 class="text-lg font-semibold text-gray-800" style="font-family: var(--font-heading)">
      {{ pageTitles[route.path] || 'Admin' }}
    </h2>
  </header>
</template>
