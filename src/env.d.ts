/// <reference types="vite/client" />

declare module 'virtual-icons' {}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  // eslint-disable-next-line ts/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
