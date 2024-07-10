import { defineStore } from 'pinia'
import { darkTheme } from '@/styles/dark'
import { lightTheme } from '@/styles/light'

export interface AppStore {
  switchMode: (val: string) => void
  setTabBarActive: (val: string) => void
}

const prefersDark
  = window.matchMedia
  && window.matchMedia('(prefers-color-scheme: dark)').matches

const locaApp = localStorage.getItem('app') ? JSON.parse(localStorage.getItem('app')) : ''

const useAppStore = defineStore('app', () => {
  const theme = prefersDark ? 'dark' : 'light'
  const mode = ref(theme)

  const switchMode = (val: string) => {
    const rootStyleVars = val === 'light' ? lightTheme : darkTheme
    StyleProvider(rootStyleVars)

    mode.value = val
  }

  const tabBarActive = ref(locaApp.tabBarActive || '/')

  const setTabBarActive = (val: string) => {
    tabBarActive.value = val
  }

  return {
    mode,
    switchMode,
    tabBarActive,
    setTabBarActive,
  }
}, {
  persist: true,
})

export default useAppStore
