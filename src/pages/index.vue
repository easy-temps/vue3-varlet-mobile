<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import { languageColumns, locale } from '@/utils/i18n'

definePage({
  name: 'home',
  meta: {
    level: 1,
  },
})

const appStore = useAppStore()
const checked = ref<boolean>(isDark.value)

watch(
  () => isDark.value,
  (newMode) => {
    checked.value = newMode
  },
  { immediate: true },
)

function toggle() {
  toggleDark()
  appStore.switchMode(isDark.value ? 'dark' : 'light')
}

const { t } = useI18n()

const language = computed(() => languageColumns.find(l => l.value === locale.value).text)

async function languagePicker() {
  await Picker({
    modelValue: [locale.value],
    toolbar: true,
    columns: [
      languageColumns,
    ],
    onConfirm(values) {
      if (locale.value === values[0])
        return
      locale.value = values[0] as string
    },
  })
}

const menus = computed(() => ([
  { title: t('home.mockGuide'), router: 'mock' },
  { title: t('home.echartsDemo'), router: 'charts' },
  { title: t('home.persistPiniaState'), router: 'counter' },
  { title: t('home.unocssExample'), router: 'unocss' },
  { title: t('home.keepAlive'), router: 'keepalive' },
  { title: t('home.iconx'), router: 'iconx' },
  { title: t('home.404Demo'), router: 'unknown' },
]))
</script>

<template>
  <Container>
    <var-paper radius="10" :elevation="2">
      <var-cell border>
        {{ t('home.darkMode') }}
        <template #extra>
          <var-switch v-model="checked" @click="toggle" />
        </template>
      </var-cell>

      <var-cell ripple border @click="languagePicker">
        {{ t('home.language') }}
        <template #extra>
          <div class="w-80 flex items-center justify-right">
            <span>{{ language }}</span>
            <var-icon name="chevron-right" />
          </div>
        </template>
      </var-cell>

      <var-cell
        v-for="(item, index) in menus"
        :key="item.router"
        :border="index !== menus.length - 1"
        ripple
        @click="$router.push(item.router)"
      >
        {{ item.title }}
        <template #extra>
          <var-icon name="chevron-right" />
        </template>
      </var-cell>
    </var-paper>
  </Container>
</template>
