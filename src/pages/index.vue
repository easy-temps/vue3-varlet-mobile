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
  appStore.swithMode(isDark.value ? 'dark' : 'light')
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

const router = useRouter()
const menuList = computed(() => ([
  { title: t('home.mockGuide'), router: 'mock' },
  { title: t('home.echartsDemo'), router: 'charts' },
  { title: t('home.persistPiniaState'), router: 'counter' },
  { title: t('home.404Demo'), router: 'unknown' },
  { title: t('home.unocssExample'), router: 'unocss' },
  { title: t('home.keepAlive'), router: 'keepalive' },
]))

function menuClick(item: any) {
  if (item.router)
    router.push(item.router)
}
</script>

<template>
  <Container :padding-x="0">
    <var-paper :elevation="0" class="m-10 mt-20">
      <var-cell ripple :border="true" :border-offset="0">
        {{ t('home.darkMode') }}
        <template #extra>
          <var-switch v-model="checked" @click="toggle" />
        </template>
      </var-cell>

      <var-cell ripple :border="true" :border-offset="0" @click="languagePicker">
        {{ t('home.language') }}
        <template #extra>
          <div class="w-150 flex items-center justify-right">
            {{ language }}
            <var-icon name="chevron-right" />
          </div>
        </template>
      </var-cell>

      <var-cell
        v-for="(item, index) in menuList" :key="item.title" ripple :border="index !== menuList.length - 1"
        :border-offset="0" @click="menuClick(item)"
      >
        {{ item.title }}
        <template #extra>
          <var-icon name="chevron-right" />
        </template>
      </var-cell>
    </var-paper>
  </Container>
</template>
