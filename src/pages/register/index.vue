<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { z } from 'zod'
import { Snackbar } from '@varlet/ui'
import '@varlet/ui/es/snackbar/style/index'

import logo from '~/images/logo.svg'
import logoDark from '~/images/logo-dark.svg'

const { t } = useI18n()
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
  code: '',
  nickname: '',
  password: '',
  confirmPassword: '',
})

const isGettingCode = ref(false)

const buttonText = computed(() => {
  return isGettingCode.value ? t('register.gettingCode') : t('register.getCode')
})

async function getCode() {
  if (!formData.email) {
    Snackbar.error(t('register.pleaseEnterEmail'))
    return
  }

  isGettingCode.value = true
  try {
    const res = await userStore.getCode()
    if (res.code === 0) {
      Snackbar.success(`${t('register.sendCodeSuccess')}: ${res.result}`)
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isGettingCode.value = false
  }
}

async function register(valid: boolean) {
  if (!valid)
    return

  try {
    loading.value = true
    const res = await userStore.register()

    if (res.code === 0) {
      Snackbar.success(t('register.registerSuccess'))
      router.push({ name: 'login' })
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

function confirmPasswordRule(value: string) {
  if (value !== formData.password) {
    return t('register.passwordsDoNotMatch')
  }
  return true
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

    <var-form :model="formData" validate-trigger="onSubmit" @submit="register">
      <var-space direction="column" :size="[14, 0]">
        <var-auto-complete
          v-model="formData.email"
          variant="outlined"
          :rules="z.string().email($t('login.emailFormatError'))"
          :options="emailSuggestions"
          :placeholder="$t('register.email')"
        />

        <var-input
          v-model="formData.code"
          variant="outlined"
          :rules="z.string().min(1, $t('register.pleaseEnterCode'))"
          :placeholder="$t('register.code')"
        >
          <template #append-icon>
            <var-button
              :loading="isGettingCode"
              type="primary"
              size="small"
              @click="getCode"
            >
              {{ buttonText }}
            </var-button>
          </template>
        </var-input>

        <var-input
          v-model="formData.nickname"
          variant="outlined"
          :rules="z.string().min(1, $t('register.pleaseEnterNickname'))"
          :placeholder="$t('register.nickname')"
        />

        <var-input
          v-model="formData.password"
          type="password"
          variant="outlined"
          :rules="z.string().min(1, $t('register.pleaseEnterPassword'))"
          :placeholder="$t('register.password')"
        />

        <var-input
          v-model="formData.confirmPassword"
          type="password"
          variant="outlined"
          :rules="[z.string().min(1, $t('register.pleaseEnterConfirmPassword')), confirmPasswordRule]"
          :placeholder="$t('register.comfirmPassword')"
        />

        <var-button
          :loading="loading"
          type="primary"
          native-type="submit"
          block
        >
          {{ $t('register.confirm') }}
        </var-button>
      </var-space>
    </var-form>

    <var-button size="small" type="primary" text block @click="router.push('/login')">
      {{ $t('register.backToLogin') }}
    </var-button>
  </var-space>
</template>

<route lang="json5">
{
  name: 'register',
  meta: {
    i18n: 'menus.register'
  },
}
</route>
