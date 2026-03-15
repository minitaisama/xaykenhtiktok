<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { useToast } from '../composables/useToast'
import { Save, Plus, Trash2 } from 'lucide-vue-next'

const store = useSettingsStore()
const toast = useToast()
const activeTab = ref(0)

interface Tier {
  videoCount: number
  priceWithActor: number
  priceWithoutActor: number
  duration: string
}

interface Package {
  slug: string
  name: string
  subtitle: string
  active: boolean
  features: string[]
  tiers?: Tier[]
  price?: number
}

const packages = ref<Package[]>([])

onMounted(async () => {
  await store.fetchPricing()
  if (store.pricing?.packages) {
    packages.value = JSON.parse(JSON.stringify(store.pricing.packages))
  }
})

const currentPkg = computed(() => packages.value[activeTab.value])

function addTier(pkgIndex: number) {
  if (!packages.value[pkgIndex].tiers) packages.value[pkgIndex].tiers = []
  packages.value[pkgIndex].tiers!.push({ videoCount: 0, priceWithActor: 0, priceWithoutActor: 0, duration: '' })
}

function removeTier(pkgIndex: number, tierIndex: number) {
  packages.value[pkgIndex].tiers!.splice(tierIndex, 1)
}

function addFeature(pkgIndex: number) {
  packages.value[pkgIndex].features.push('')
}

function removeFeature(pkgIndex: number, featureIndex: number) {
  packages.value[pkgIndex].features.splice(featureIndex, 1)
}

function formatPrice(value: number): string {
  return value.toLocaleString('vi-VN')
}

async function savePricing() {
  try {
    await store.updatePricing({ packages: packages.value })
    toast.success('Đã lưu báo giá')
  } catch {
    toast.error('Lỗi khi lưu báo giá')
  }
}
</script>

<template>
  <div>
    <!-- Package Tabs -->
    <div class="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
      <button
        v-for="(pkg, i) in packages"
        :key="pkg.slug"
        @click="activeTab = i"
        class="px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
        :class="activeTab === i ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
      >
        {{ pkg.name }}
      </button>
    </div>

    <div v-if="currentPkg" class="space-y-6">
      <!-- Package Info -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold mb-4" style="font-family: var(--font-heading)">Thông tin gói</h3>
        <div class="grid grid-cols-2 gap-4 max-w-2xl">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tên gói</label>
            <input v-model="currentPkg.name" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input v-model="currentPkg.subtitle" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
          </div>
        </div>

        <!-- Single price for tron-goi -->
        <div v-if="currentPkg.slug === 'tron-goi'" class="mt-4 max-w-sm">
          <label class="block text-sm font-medium text-gray-700 mb-1">Giá (VND)</label>
          <input v-model.number="currentPkg.price" type="number" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
        </div>

        <!-- Features -->
        <div class="mt-5">
          <label class="block text-sm font-medium text-gray-700 mb-2">Tính năng</label>
          <div v-for="(feature, i) in currentPkg.features" :key="i" class="flex gap-2 mb-2">
            <input v-model="currentPkg.features[i]" type="text" class="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
            <button type="button" @click="removeFeature(activeTab, i)" class="p-2 text-gray-400 hover:text-red-500 cursor-pointer">
              <Trash2 :size="14" />
            </button>
          </div>
          <button type="button" @click="addFeature(activeTab)" class="flex items-center gap-1 text-sm text-pink-500 hover:text-pink-600 cursor-pointer">
            <Plus :size="14" /> Thêm tính năng
          </button>
        </div>
      </div>

      <!-- Pricing Table (for non-tron-goi) -->
      <div v-if="currentPkg.tiers" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold" style="font-family: var(--font-heading)">Bảng giá</h3>
          <button @click="addTier(activeTab)" class="flex items-center gap-1 text-sm text-pink-500 hover:text-pink-600 cursor-pointer">
            <Plus :size="14" /> Thêm dòng
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left text-xs font-medium text-gray-500 uppercase px-3 py-2">Số video</th>
                <th class="text-left text-xs font-medium text-gray-500 uppercase px-3 py-2">Có diễn viên (VND)</th>
                <th class="text-left text-xs font-medium text-gray-500 uppercase px-3 py-2">Không diễn viên (VND)</th>
                <th class="text-left text-xs font-medium text-gray-500 uppercase px-3 py-2">Thời gian</th>
                <th class="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tier, i) in currentPkg.tiers" :key="i" class="border-b border-gray-50">
                <td class="px-3 py-2">
                  <input v-model.number="tier.videoCount" type="number" class="w-20 px-2 py-1.5 rounded border border-gray-300 text-sm outline-none" />
                </td>
                <td class="px-3 py-2">
                  <input v-model.number="tier.priceWithActor" type="number" class="w-36 px-2 py-1.5 rounded border border-gray-300 text-sm outline-none" />
                </td>
                <td class="px-3 py-2">
                  <input v-model.number="tier.priceWithoutActor" type="number" class="w-36 px-2 py-1.5 rounded border border-gray-300 text-sm outline-none" />
                </td>
                <td class="px-3 py-2">
                  <input v-model="tier.duration" type="text" class="w-32 px-2 py-1.5 rounded border border-gray-300 text-sm outline-none" />
                </td>
                <td class="px-3 py-2">
                  <button @click="removeTier(activeTab, i)" class="p-1 text-gray-400 hover:text-red-500 cursor-pointer">
                    <Trash2 :size="14" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Save Button -->
      <button @click="savePricing" class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium cursor-pointer" style="background: linear-gradient(135deg, #ec4899, #db2777)">
        <Save :size="16" />
        Lưu báo giá
      </button>
    </div>
  </div>
</template>
