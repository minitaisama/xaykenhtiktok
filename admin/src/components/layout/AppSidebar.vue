<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import {
  LayoutDashboard,
  FolderKanban,
  DollarSign,
  Settings,
  Phone,
  Image,
  LogOut,
} from 'lucide-vue-next'

const route = useRoute()
const auth = useAuthStore()

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/projects', label: 'Dự án', icon: FolderKanban },
  { path: '/pricing', label: 'Báo giá', icon: DollarSign },
  { path: '/contact', label: 'Liên hệ', icon: Phone },
  { path: '/media', label: 'Media', icon: Image },
  { path: '/settings', label: 'Cài đặt', icon: Settings },
]
</script>

<template>
  <aside class="fixed left-0 top-0 h-screen w-60 flex flex-col" style="background: var(--color-sidebar)">
    <!-- Logo -->
    <div class="p-5 border-b border-white/10">
      <h1 class="text-white text-xl font-bold" style="font-family: var(--font-heading)">
        EN.1 <span class="text-sm font-normal text-white/50">Admin</span>
      </h1>
    </div>

    <!-- Nav -->
    <nav class="flex-1 py-4 px-3 space-y-1">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
        :class="route.path === item.path
          ? 'bg-primary text-white'
          : 'text-white/60 hover:text-white hover:bg-white/5'"
      >
        <component :is="item.icon" :size="18" />
        {{ item.label }}
      </router-link>
    </nav>

    <!-- User -->
    <div class="p-4 border-t border-white/10">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
          {{ auth.user?.name?.charAt(0) || 'A' }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-white text-sm truncate">{{ auth.user?.name }}</div>
          <div class="text-white/40 text-xs truncate">{{ auth.user?.role }}</div>
        </div>
      </div>
      <button
        @click="auth.logout(); $router.push('/login')"
        class="flex items-center gap-2 text-white/40 hover:text-white text-sm w-full px-1 transition-colors cursor-pointer"
      >
        <LogOut :size="16" />
        Đăng xuất
      </button>
    </div>
  </aside>
</template>
