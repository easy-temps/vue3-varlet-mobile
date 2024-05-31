<script setup lang="ts">
import useAppStore from '@/stores/modules/app'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const active = ref(appStore.tabBarActive)

const display = computed(() => {
  if (route.meta.level && route.meta.level !== 2)
    return true
  return false
})

function change(e: string) {
  router.replace(e)
  appStore.setTabBarActive(e)
}
</script>

<template>
  <div v-show="display">
    <var-bottom-navigation v-model:active="active" :fixed="true" :safe-area="true" @change="change(active)">
      <var-bottom-navigation-item name="/" :label="t('layouts.home')" icon="home" />
      <var-bottom-navigation-item name="profile" :label="t('layouts.profile')" icon="account-circle" />
    </var-bottom-navigation>
  </div>
</template>
