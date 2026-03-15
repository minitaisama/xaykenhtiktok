<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue'
import Toast from './components/ui/Toast.vue'

const route = useRoute()
</script>

<template>
  <Toast />
  <template v-if="route.meta.public">
    <router-view />
  </template>
  <template v-else>
    <AppLayout>
      <router-view />
    </AppLayout>
  </template>
</template>
