import { Themes } from '@varlet/ui'

export const darkTheme = Themes.toViewport({
  ...Themes.dark,
  '--color-primary': '#00C16A',
  '--color-nprogress': '#D9FBE8',
}, {
  viewportUnit: 'vw',
})
