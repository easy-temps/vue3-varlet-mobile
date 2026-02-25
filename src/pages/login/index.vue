<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { RouteMap } from 'vue-router'
import { useUserStore } from '@/stores'
import { z } from 'zod'

import logo from '~/images/logo.svg'
import logoDark from '~/images/logo-dark.svg'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const dark = ref<boolean>(isDark.value)

watch(
  () => isDark.value,
  (newMode) => {
    dark.value = newMode
  },
)

const formData = reactive({
  email: '',
  password: '',
})

async function login(valid: boolean) {
  if (!valid)
    return

  try {
    loading.value = true
    await userStore.login(formData)
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    router.push({
      path: (redirect as keyof RouteMap) || '/',
      query: {
        ...othersQuery,
      },
    })
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

const emailSuggestions = computed(() =>
  ['@qq.com', '@163.com', '@gmail.com'].map((suffix) => {
    const [prefix] = formData.email.split('@')
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  }),
)
</script>

<template>
  <var-space direction="column" :size="[14, 0]">
    <div class="flex justify-center">
      <var-image :src="dark ? logoDark : logo" class="h-120 w-120" alt="brand logo" />
    </div>

    <var-form :model="formData" validate-trigger="onSubmit" @submit="login">
      <var-space direction="column" :size="[14, 0]">
        <var-auto-complete
          v-model="formData.email"
          variant="outlined"
          :rules="z.string().email($t('login.emailFormatError'))"
          :options="emailSuggestions"
          :placeholder="($t('login.email'))"
        />

        <var-input
          v-model="formData.password"
          type="password"
          variant="outlined"
          :rules="z.string().min(1, $t('login.pleaseEnterPassword'))"
          :placeholder="($t('login.password'))"
        />

        <var-button
          :loading="loading"
          type="primary"
          native-type="submit"
          block
        >
          {{ $t('login.login') }}
        </var-button>
      </var-space>
    </var-form>

    <var-button size="small" type="primary" text block @click="router.push('/register')">
      {{ $t('login.sign-up') }}
    </var-button>

    <var-button size="small" type="primary" text block @click="router.push('/forgot-password')">
      {{ $t('login.forgot-password') }}
    </var-button>
  </var-space>
</template>

<route lang="json5">
{
  name: 'login',
  meta: {
    i18n: 'menus.login'
  },
}
</route>
