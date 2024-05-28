import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetUno,
} from 'unocss'

import { presetVarlet } from '@varlet/preset-unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno,
    presetAttributify,
    presetIcons,
    presetMini,
    presetVarlet,
    // Why use this plug-in?
    // The template uses viewport as the mobile adaptation scheme, and the default unit of unocss is rem
    // So it needs to be converted to px, and then postcss converts px to vw/vh to complete the adaptation.
    presetRemToPx({
      // Why do you want to set the basic font size here? Read the following article.
      // https://juejin.cn/post/7262975395620618298
      baseFontSize: 4,
    }),
  ],
})
