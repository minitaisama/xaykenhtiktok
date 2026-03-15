<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { useToast } from '../composables/useToast'
import { Save, Plus, X } from 'lucide-vue-next'

const store = useSettingsStore()
const toast = useToast()

const form = ref({
  phones: [''],
  contactName: '',
  zalo: '',
  address: '',
  email: '',
  workingHours: '',
  socialLinks: {
    tiktok: '',
    facebook: '',
    youtube: '',
  },
})

onMounted(async () => {
  await store.fetchContact()
  if (store.contact) {
    form.value = {
      phones: store.contact.phones?.length ? [...store.contact.phones] : [''],
      contactName: store.contact.contactName || '',
      zalo: store.contact.zalo || '',
      address: store.contact.address || '',
      email: store.contact.email || '',
      workingHours: store.contact.workingHours || '',
      socialLinks: {
        tiktok: store.contact.socialLinks?.tiktok || '',
        facebook: store.contact.socialLinks?.facebook || '',
        youtube: store.contact.socialLinks?.youtube || '',
      },
    }
  }
})

function addPhone() {
  form.value.phones.push('')
}

function removePhone(index: number) {
  if (form.value.phones.length > 1) {
    form.value.phones.splice(index, 1)
  }
}

async function saveContact() {
  try {
    await store.updateContact({
      ...form.value,
      phones: form.value.phones.filter(Boolean),
    })
    toast.success('Đã lưu thông tin liên hệ')
  } catch {
    toast.error('Lỗi khi lưu')
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Contact Info -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold mb-5" style="font-family: var(--font-heading)">Thông tin liên hệ</h3>
      <form @submit.prevent="saveContact" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên liên hệ</label>
          <input v-model="form.contactName" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
          <div v-for="(phone, i) in form.phones" :key="i" class="flex gap-2 mb-2">
            <input v-model="form.phones[i]" type="text" class="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" placeholder="0xxx xxx xxx" />
            <button v-if="form.phones.length > 1" type="button" @click="removePhone(i)" class="p-2 text-gray-400 hover:text-red-500 cursor-pointer">
              <X :size="16" />
            </button>
          </div>
          <button type="button" @click="addPhone" class="flex items-center gap-1 text-sm text-pink-500 hover:text-pink-600 cursor-pointer">
            <Plus :size="14" /> Thêm số
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Zalo</label>
          <input v-model="form.zalo" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
          <input v-model="form.address" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Giờ làm việc</label>
          <input v-model="form.workingHours" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" placeholder="Thứ 2 - Thứ 6: 9:00 - 18:00" />
        </div>

        <button type="submit" class="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer" style="background: linear-gradient(135deg, #ec4899, #db2777)">
          <Save :size="16" />
          Lưu liên hệ
        </button>
      </form>
    </div>

    <!-- Social Links -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold mb-5" style="font-family: var(--font-heading)">Mạng xã hội</h3>
      <form @submit.prevent="saveContact" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">TikTok URL</label>
          <input v-model="form.socialLinks.tiktok" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" placeholder="https://tiktok.com/@..." />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
          <input v-model="form.socialLinks.facebook" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" placeholder="https://facebook.com/..." />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
          <input v-model="form.socialLinks.youtube" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-pink-500 outline-none" placeholder="https://youtube.com/@..." />
        </div>
        <button type="submit" class="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer" style="background: linear-gradient(135deg, #ec4899, #db2777)">
          <Save :size="16" />
          Lưu mạng xã hội
        </button>
      </form>
    </div>
  </div>
</template>
