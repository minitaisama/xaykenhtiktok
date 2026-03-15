<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '../composables/useApi'
import { useToast } from '../composables/useToast'
import { Upload, Trash2, Image, Film, X } from 'lucide-vue-next'

interface MediaItem {
  id: string
  filename: string
  original_name: string
  mime_type: string
  size: number
  path: string
  created_at: string
}

const toast = useToast()
const items = ref<MediaItem[]>([])
const loading = ref(false)
const uploading = ref(false)
const filter = ref('all')
const showDeleteConfirm = ref<string | null>(null)
const dragOver = ref(false)

async function fetchMedia() {
  loading.value = true
  try {
    const params: Record<string, string> = {}
    if (filter.value !== 'all') params.type = filter.value
    const { data } = await api.get('/media', { params })
    items.value = data.items
  } finally {
    loading.value = false
  }
}

async function handleUpload(files: FileList | null) {
  if (!files?.length) return
  uploading.value = true
  try {
    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)
      await api.post('/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
    toast.success(`Đã upload ${files.length} file`)
    await fetchMedia()
  } catch {
    toast.error('Lỗi khi upload file')
  } finally {
    uploading.value = false
  }
}

async function handleDelete(id: string) {
  try {
    await api.delete(`/media/${id}`)
    items.value = items.value.filter((m) => m.id !== id)
    toast.success('Đã xóa file')
    showDeleteConfirm.value = null
  } catch {
    toast.error('Lỗi khi xóa file')
  }
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  handleUpload(e.dataTransfer?.files || null)
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function isImage(mime: string) { return mime.startsWith('image/') }

onMounted(fetchMedia)
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex gap-1 bg-gray-100 rounded-lg p-1">
        <button
          v-for="f in [{ id: 'all', label: 'Tất cả' }, { id: 'image', label: 'Ảnh' }, { id: 'video', label: 'Video' }]"
          :key="f.id"
          @click="filter = f.id; fetchMedia()"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition cursor-pointer"
          :class="filter === f.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'"
        >
          {{ f.label }}
        </button>
      </div>
      <label class="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer" style="background: linear-gradient(135deg, #ec4899, #db2777)">
        <Upload :size="16" />
        {{ uploading ? 'Đang upload...' : 'Upload file' }}
        <input type="file" class="hidden" multiple accept="image/*,video/*" @change="handleUpload(($event.target as HTMLInputElement).files)" :disabled="uploading" />
      </label>
    </div>

    <!-- Drop Zone -->
    <div
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="onDrop"
      class="border-2 border-dashed rounded-xl p-8 text-center mb-6 transition"
      :class="dragOver ? 'border-pink-400 bg-pink-50' : 'border-gray-200 bg-gray-50'"
    >
      <Upload :size="32" class="mx-auto mb-2 text-gray-400" />
      <p class="text-sm text-gray-500">Kéo thả file vào đây hoặc click nút Upload</p>
      <p class="text-xs text-gray-400 mt-1">Hỗ trợ: JPG, PNG, WebP, MP4, WebM (max 100MB)</p>
    </div>

    <!-- Grid -->
    <div v-if="loading" class="text-center text-gray-400 py-12">Loading...</div>
    <div v-else-if="items.length === 0" class="text-center text-gray-400 py-12">Chưa có media nào</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="group relative bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition"
      >
        <div class="aspect-square bg-gray-100 flex items-center justify-center">
          <img
            v-if="isImage(item.mime_type)"
            :src="item.path"
            :alt="item.original_name"
            class="w-full h-full object-cover"
          />
          <Film v-else :size="32" class="text-gray-400" />
        </div>
        <div class="p-2">
          <div class="text-xs text-gray-700 truncate">{{ item.original_name }}</div>
          <div class="text-xs text-gray-400">{{ formatSize(item.size) }}</div>
        </div>
        <button
          @click="showDeleteConfirm = item.id"
          class="absolute top-1 right-1 p-1 rounded bg-black/50 text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"
        >
          <Trash2 :size="12" />
        </button>
      </div>
    </div>

    <!-- Delete Confirm -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40" @click.self="showDeleteConfirm = null">
        <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
          <h3 class="text-lg font-semibold mb-2">Xóa file?</h3>
          <p class="text-gray-500 text-sm mb-5">Hành động này không thể hoàn tác.</p>
          <div class="flex gap-3 justify-center">
            <button @click="showDeleteConfirm = null" class="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">Hủy</button>
            <button @click="handleDelete(showDeleteConfirm!)" class="px-4 py-2 rounded-lg text-white text-sm bg-red-500 hover:bg-red-600 cursor-pointer">Xóa</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
