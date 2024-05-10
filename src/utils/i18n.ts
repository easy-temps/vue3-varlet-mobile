import { createI18n } from 'vue-i18n'

/**
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages'
import { Locale } from '@varlet/ui'
import type { PickerColumnOption } from '@varlet/ui'

export const i18n = createI18n({
  locale: localStorage.getItem('language') || navigator.language,
  fallbackLocale: 'zhCN',
  messages,
})

/** 多语言 picker columns */
export const languageColumns: PickerColumnOption[] = [
  { text: '简体中文', value: 'zh-CN' },
  { text: 'English', value: 'en-US' },
]

/** 当前语言 */
export const locale = computed({
  get() {
    return (i18n.global.locale as unknown as Ref<string>).value
  },
  set(language: string) {
    localStorage.setItem('language', language);
    (i18n.global.locale as unknown as Ref<string>).value = language
    Locale.use(language)
  },
})

// 载入 varlet 语言包
Locale.add('zh-CN', Locale.zhCN)
Locale.add('en-US', Locale.enUS)

// 根据当前语言切换 varlet 语言包
Locale.use(locale.value)
