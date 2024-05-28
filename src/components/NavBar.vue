<script setup lang="ts">
const route = useRoute()
const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
}

const { t } = useI18n()

const title = computed(() => {
  if (!route.meta)
    return ''

  return route.meta.i18n ? t(route.meta.i18n) : (route.meta.title || '')
})
</script>

<template>
  <var-app-bar v-show="title" :title="title" :fixed="true" :safe-area-top="true">
    <template #left>
      <var-button color="transparent" text-color="#fff" round text @click="onBack">
        <var-icon name="chevron-left" :size="24" />
      </var-button>
    </template>
  </var-app-bar>
</template>
