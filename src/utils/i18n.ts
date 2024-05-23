import { createI18n } from 'vue-i18n'

/**
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages'
import { Locale } from '@varlet/ui'
import type { PickerColumnOption } from '@varlet/ui'

/** Default language pack name */
const FALLBACK_LOCALE = 'zh-CN'

/** i18n picker columns */
export const languageColumns: PickerColumnOption[] = [
  { text: '简体中文', value: 'zh-CN' },
  { text: 'English', value: 'en-US' },
]

/** Gets the language pack name for the current language */
function getI18nLocale() {
  const locale = localStorage.getItem('language') || navigator.language
  for (const l of languageColumns) {
    const value = l.value as string
    if (value === locale)
      return locale // A language pack for the current language exists
    else if (value.indexOf(locale) === 0)
      return value // A language pack that exists in any locale of the current language
  }
  return FALLBACK_LOCALE // Use the default language pack
}

export const i18n = createI18n({
  locale: getI18nLocale(),
  legacy: false,
  messages,
})

/** Current language */
export const locale = computed({
  get() {
    return i18n.global.locale.value
  },
  set(language: string) {
    localStorage.setItem('language', language)
    i18n.global.locale.value = language
    Locale.use(language)
  },
})

// Load the varlet language package
Locale.add('zh-CN', Locale.zhCN)
Locale.add('en-US', Locale.enUS)

// Switch current language
Locale.use(locale.value)
