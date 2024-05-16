import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetUno,
} from 'unocss'
import { presetVarlet } from '@varlet/preset-unocss'

import presetRemToPx from '@unocss/preset-rem-to-px'

// Friends who have just used unocss can use this tool: https://to-unocss.netlify.app

export default defineConfig({
  presets: [
    presetUno,
    presetVarlet(),
    presetAttributify,
    presetIcons(),
    // Why use this plug-in?
    // The template uses viewport as the mobile adaptation scheme, and the default unit of unocss is rem
    // So it needs to be converted to px, and then postcss converts px to vw/vh to complete the adaptation.
    presetRemToPx({
      // Why do you want to set the basic font size here? Read the following article.
      // https://juejin.cn/post/7262975395620618298
      baseFontSize: 4,
    }),
    presetMini(),
  ],
  shortcuts: [
    // shortcuts to multiple utilities
    ['btn', 'px-6 py-3 rounded-3 border-none inline-block bg-green-400 text-white cursor-pointer !outline-none hover:bg-green-600 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ],
})
