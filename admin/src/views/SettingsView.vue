<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { useToast } from '../composables/useToast'
import { Save } from 'lucide-vue-next'

const store = useSettingsStore()
const toast = useToast()
const activeTab = ref('site')

const siteForm = ref({
  siteTitle: '',
  siteDescription: '',
  keywords: '',
  ogTitle: '',
  ogDescription: '',
})

onMounted(async () => {
  await store.fetchSite()
  if (store.site) {
    siteForm.value = {
      siteTitle: store.site.siteTitle || '',
      siteDescription: store.site.siteDescription || '',
      keywords: Array.isArray(store.site.keywords) ? store.site.keywords.join(', ') : '',
      ogTitle: store.site.ogTitle || '',
      ogDescription: store.site.ogDescription || '',
    }
  }
})

async function saveSite() {
  try {
    await store.updateSite({
      ...siteForm.value,
      keywords: siteForm.value.keywords.split(',').map((k: string) => k.trim()).filter(Boolean),
    })
    toast.success('Đã lưu cài đặt site')
  } catch {
    toast.error('Lỗi khi lưu cài đặt')
  }
}
</script>

<template>
  <div>
    <!-- Tabs -->
    <div class="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
      <button
        v-for="tab in [{ id: 'site', label: 'Thông tin site' }, { id: 'seo', label: 'SEO' }]"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
        :class="activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <!-- Site Info Tab -->
      <form v-if="activeTab === 'site'" @submit.prevent="saveSite" class="space-y-5 max-w-2xl">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên website</label>
          <input v-model="siteForm.siteTitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả website</label>
          <textarea v-model="siteForm.siteDescription" rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none resize-none"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Keywords (cách nhau bằng dấu phẩy)</label>
          <input v-model="siteForm.keywords" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" placeholder="tiktok, video, marketing" />
        </div>
        <button type="submit" class="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer" style="background: linear-gradient(135deg, #ec4899, #db2777)">
          <Save :size="16" />
          Lưu cài đặt
        </button>
      </form>

      <!-- SEO Tab -->
      <form v-if="activeTab === 'seo'" @submit.prevent="saveSite" class="space-y-5 max-w-2xl">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
          <input v-model="siteForm.ogTitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
          <textarea v-model="siteForm.ogDescription" rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none resize-none"></textarea>
        </div>
        <button type="submit" class="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer" style="background: linear-gradient(135deg, #ec4899, #db2777)">
          <Save :size="16" />
          Lưu SEO
        </button>
      </form>
    </div>
  </div>
</template>
