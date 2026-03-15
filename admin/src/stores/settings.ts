import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../composables/useApi'

export const useSettingsStore = defineStore('settings', () => {
  const site = ref<any>({})
  const contact = ref<any>({})
  const pricing = ref<any>({})
  const loading = ref(false)

  async function fetchSite() {
    const { data } = await api.get('/settings/site')
    site.value = data
  }

  async function updateSite(data: any) {
    const { data: result } = await api.put('/settings/site', data)
    site.value = result
  }

  async function fetchContact() {
    const { data } = await api.get('/settings/contact')
    contact.value = data
  }

  async function updateContact(data: any) {
    const { data: result } = await api.put('/settings/contact', data)
    contact.value = result
  }

  async function fetchPricing() {
    const { data } = await api.get('/settings/pricing')
    pricing.value = data
  }

  async function updatePricing(data: any) {
    const { data: result } = await api.put('/settings/pricing', data)
    pricing.value = result
  }

  return { site, contact, pricing, loading, fetchSite, updateSite, fetchContact, updateContact, fetchPricing, updatePricing }
})
