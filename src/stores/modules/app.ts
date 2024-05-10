import { defineStore } from 'pinia'
import { StyleProvider, Themes } from '@varlet/ui'

export interface AppStore {
  swithMode: (val: string) => void
  setTabBarActive: (val: string) => void
}

const prefersDark
  = window.matchMedia
  && window.matchMedia('(prefers-color-scheme: dark)').matches

const locaApp = localStorage.getItem('app') ? JSON.parse(localStorage.getItem('app')) : ''

const useAppStore = defineStore('app', () => {
  const theme = prefersDark ? 'dark' : 'light'
  const mode = ref(theme)

  const swithMode = (val: string) => {
    const rootStyleVars = val === 'light'
      ? Themes.toViewport({ '--color-body': '#f7f8fa', '--result-title-font-size': '32px', '--result-description-font-size': '14px' })
      : Themes.toViewport({ ...Themes.dark, '--result-title-font-size': '32px', '--result-description-font-size': '14px' })
    StyleProvider(rootStyleVars)

    mode.value = val
  }

  const tabBarActive = ref(locaApp.tabBarActive || '/')

  const setTabBarActive = (val: string) => {
    tabBarActive.value = val
  }

  return {
    mode,
    swithMode,
    tabBarActive,
    setTabBarActive,
  }
}, {
  persist: true,
})

export default useAppStore
