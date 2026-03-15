import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../composables/useApi'

export interface Project {
  id: string
  title: string
  description: string | null
  thumbnail: string | null
  video_url: string | null
  category: string | null
  package: 'chuyen-nghiep' | 'cao-cap'
  featured: boolean
  sort_order: number
  views: number
  likes: number
  shares: number
  created_at: string
  updated_at: string
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const total = ref(0)
  const loading = ref(false)

  async function fetchProjects(params: Record<string, string> = {}) {
    loading.value = true
    try {
      const { data } = await api.get('/projects', { params })
      projects.value = data.items
      total.value = data.total
    } finally {
      loading.value = false
    }
  }

  async function createProject(project: Partial<Project>) {
    const { data } = await api.post('/projects', project)
    projects.value.unshift(data)
    return data
  }

  async function updateProject(id: string, project: Partial<Project>) {
    const { data } = await api.put(`/projects/${id}`, project)
    const idx = projects.value.findIndex((p) => p.id === id)
    if (idx !== -1) projects.value[idx] = data
    return data
  }

  async function deleteProject(id: string) {
    await api.delete(`/projects/${id}`)
    projects.value = projects.value.filter((p) => p.id !== id)
  }

  async function toggleFeatured(id: string) {
    const { data } = await api.put(`/projects/${id}/featured`)
    const idx = projects.value.findIndex((p) => p.id === id)
    if (idx !== -1) projects.value[idx] = data
    return data
  }

  return { projects, total, loading, fetchProjects, createProject, updateProject, deleteProject, toggleFeatured }
})
