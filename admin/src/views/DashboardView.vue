<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '../composables/useApi'
import { FolderKanban, Eye, Star, Image } from 'lucide-vue-next'

const stats = ref({
  totalProjects: 0,
  totalViews: 0,
  featuredCount: 0,
  totalMedia: 0,
  projectsByCategory: [] as { category: string; count: number }[],
  recentProjects: [] as any[],
})

onMounted(async () => {
  try {
    const { data } = await api.get('/analytics/dashboard')
    stats.value = data
  } catch {}
})

function formatViews(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}

function maxCategoryCount(): number {
  return Math.max(...stats.value.projectsByCategory.map((c) => c.count), 1)
}
</script>

<template>
  <div>
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
            <FolderKanban :size="20" class="text-pink-500" />
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ stats.totalProjects }}</div>
            <div class="text-sm text-gray-500">Tổng dự án</div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
            <Eye :size="20" class="text-teal-500" />
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ formatViews(stats.totalViews) }}</div>
            <div class="text-sm text-gray-500">Tổng lượt xem</div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <Star :size="20" class="text-amber-500" />
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ stats.featuredCount }}</div>
            <div class="text-sm text-gray-500">Featured</div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Image :size="20" class="text-purple-500" />
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ stats.totalMedia }}</div>
            <div class="text-sm text-gray-500">Media files</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Projects by Category -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4" style="font-family: var(--font-heading)">Dự án theo danh mục</h3>
        <div v-if="stats.projectsByCategory.length" class="space-y-3">
          <div v-for="cat in stats.projectsByCategory" :key="cat.category" class="flex items-center gap-3">
            <div class="w-24 text-sm text-gray-600 truncate">{{ cat.category }}</div>
            <div class="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
              <div
                class="h-full rounded-full flex items-center px-2"
                style="background: linear-gradient(135deg, #ec4899, #db2777)"
                :style="{ width: (cat.count / maxCategoryCount() * 100) + '%' }"
              >
                <span class="text-xs text-white font-medium">{{ cat.count }}</span>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-400 text-sm">Chưa có dữ liệu</p>
      </div>

      <!-- Recent Projects -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4" style="font-family: var(--font-heading)">Dự án gần đây</h3>
        <div v-if="stats.recentProjects.length" class="space-y-3">
          <div v-for="project in stats.recentProjects" :key="project.id" class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <div>
              <div class="text-sm font-medium text-gray-900">{{ project.title }}</div>
              <div class="text-xs text-gray-400">{{ project.category || 'N/A' }}</div>
            </div>
            <div class="flex items-center gap-2">
              <Star v-if="project.featured" :size="14" class="text-amber-400 fill-amber-400" />
              <span class="text-xs text-gray-500">{{ formatViews(project.views) }} views</span>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-400 text-sm">Chưa có dự án</p>
      </div>
    </div>
  </div>
</template>
