<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProjectsStore, type Project } from '../stores/projects'
import { useToast } from '../composables/useToast'
import { Plus, Pencil, Trash2, Star, Search, X } from 'lucide-vue-next'

const store = useProjectsStore()
const toast = useToast()
const search = ref('')
const showForm = ref(false)
const editingProject = ref<Project | null>(null)
const showDeleteConfirm = ref<string | null>(null)

const form = ref({
  title: '',
  description: '',
  category: '',
  package: 'chuyen-nghiep' as 'chuyen-nghiep' | 'cao-cap',
  video_url: '',
  featured: false,
})

const categories = [
  { value: 'fb', label: 'F&B' },
  { value: 'phong-thuy', label: 'Phong Thủy' },
  { value: 'spa', label: 'Spa' },
  { value: 'studio', label: 'Studio' },
  { value: 'thiet-bi', label: 'Thiết Bị' },
  { value: 'noi-that', label: 'Nội Thất' },
  { value: 'tuyen-dung', label: 'Tuyển Dụng' },
  { value: 'giao-duc', label: 'Giáo Dục' },
  { value: 'bat-dong-san', label: 'Bất Động Sản' },
  { value: 'thoi-trang', label: 'Thời Trang' },
]

onMounted(() => store.fetchProjects())

function openCreate() {
  editingProject.value = null
  form.value = { title: '', description: '', category: '', package: 'chuyen-nghiep', video_url: '', featured: false }
  showForm.value = true
}

function openEdit(project: Project) {
  editingProject.value = project
  form.value = {
    title: project.title,
    description: project.description || '',
    category: project.category || '',
    package: project.package,
    video_url: project.video_url || '',
    featured: project.featured,
  }
  showForm.value = true
}

async function handleSave() {
  try {
    if (editingProject.value) {
      await store.updateProject(editingProject.value.id, form.value)
      toast.success('Đã cập nhật dự án')
    } else {
      await store.createProject(form.value)
      toast.success('Đã tạo dự án mới')
    }
    showForm.value = false
  } catch {
    toast.error('Lỗi khi lưu dự án')
  }
}

async function handleDelete(id: string) {
  try {
    await store.deleteProject(id)
    toast.success('Đã xóa dự án')
    showDeleteConfirm.value = null
  } catch {
    toast.error('Lỗi khi xóa dự án')
  }
}

async function handleToggleFeatured(id: string) {
  try {
    await store.toggleFeatured(id)
  } catch {
    toast.error('Lỗi khi thay đổi featured')
  }
}

function handleSearch() {
  store.fetchProjects(search.value ? { search: search.value } : {})
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="relative">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="search"
            @input="handleSearch"
            type="text"
            placeholder="Tìm kiếm dự án..."
            class="pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none w-64"
          />
        </div>
      </div>
      <button
        @click="openCreate"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer"
        style="background: linear-gradient(135deg, #ec4899, #db2777)"
      >
        <Plus :size="16" />
        Thêm dự án
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Tên dự án</th>
            <th class="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Category</th>
            <th class="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Gói</th>
            <th class="text-center text-xs font-medium text-gray-500 uppercase px-5 py-3">Featured</th>
            <th class="text-right text-xs font-medium text-gray-500 uppercase px-5 py-3">Views</th>
            <th class="text-right text-xs font-medium text-gray-500 uppercase px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="store.loading" class="border-b border-gray-50">
            <td colspan="6" class="px-5 py-8 text-center text-gray-400">Loading...</td>
          </tr>
          <tr v-else-if="store.projects.length === 0" class="border-b border-gray-50">
            <td colspan="6" class="px-5 py-8 text-center text-gray-400">Chưa có dự án nào</td>
          </tr>
          <tr
            v-for="project in store.projects"
            :key="project.id"
            class="border-b border-gray-50 hover:bg-gray-50/50 transition"
          >
            <td class="px-5 py-3">
              <div class="font-medium text-gray-900 text-sm">{{ project.title }}</div>
              <div v-if="project.description" class="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{{ project.description }}</div>
            </td>
            <td class="px-5 py-3">
              <span v-if="project.category" class="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                {{ project.category }}
              </span>
            </td>
            <td class="px-5 py-3">
              <span
                class="inline-block px-2 py-0.5 text-xs rounded-full"
                :class="project.package === 'cao-cap' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'"
              >
                {{ project.package === 'cao-cap' ? 'Cao cấp' : 'Chuyên nghiệp' }}
              </span>
            </td>
            <td class="px-5 py-3 text-center">
              <button @click="handleToggleFeatured(project.id)" class="cursor-pointer">
                <Star :size="18" :class="project.featured ? 'text-amber-400 fill-amber-400' : 'text-gray-300'" />
              </button>
            </td>
            <td class="px-5 py-3 text-right text-sm text-gray-600">
              {{ project.views.toLocaleString() }}
            </td>
            <td class="px-5 py-3 text-right">
              <div class="flex items-center justify-end gap-1">
                <button @click="openEdit(project)" class="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <Pencil :size="15" />
                </button>
                <button @click="showDeleteConfirm = project.id" class="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 cursor-pointer">
                  <Trash2 :size="15" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40" @click.self="showForm = false">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-lg font-semibold" style="font-family: var(--font-heading)">
              {{ editingProject ? 'Sửa dự án' : 'Thêm dự án mới' }}
            </h3>
            <button @click="showForm = false" class="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X :size="20" />
            </button>
          </div>

          <form @submit.prevent="handleSave" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên dự án *</label>
              <input v-model="form.title" type="text" required class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
              <textarea v-model="form.description" rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none resize-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select v-model="form.category" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none">
                  <option value="">-- Chọn --</option>
                  <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Gói</label>
                <select v-model="form.package" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none">
                  <option value="chuyen-nghiep">Chuyên nghiệp</option>
                  <option value="cao-cap">Cao cấp</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
              <input v-model="form.video_url" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" placeholder="https://..." />
            </div>
            <div class="flex items-center gap-2">
              <input v-model="form.featured" type="checkbox" id="featured" class="rounded accent-pink-500" />
              <label for="featured" class="text-sm text-gray-700">Featured (nổi bật)</label>
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="showForm = false" class="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">Hủy</button>
              <button
                type="submit"
                class="px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer"
                style="background: linear-gradient(135deg, #ec4899, #db2777)"
              >
                {{ editingProject ? 'Cập nhật' : 'Tạo mới' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirm -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40" @click.self="showDeleteConfirm = null">
        <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Trash2 :size="20" class="text-red-500" />
          </div>
          <h3 class="text-lg font-semibold mb-2">Xóa dự án?</h3>
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
