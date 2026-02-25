<script setup lang="ts">
import { useRouter } from 'vue-router'
import { z } from 'zod'
import { Snackbar } from '@varlet/ui'
import '@varlet/ui/es/snackbar/style/index'
import { useUserStore } from '@/stores'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const formData = reactive({
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
})

const isGettingCode = ref(false)

const buttonText = computed(() => {
  return isGettingCode.value ? t('forgotPassword.gettingCode') : t('forgotPassword.getCode')
})

function confirmPasswordRule(value: string) {
  if (value !== formData.password) {
    return t('forgotPassword.passwordsDoNotMatch')
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

async function getCode() {
  if (!formData.email) {
    Snackbar.error(t('forgotPassword.pleaseEnterEmail'))
    return
  }

  isGettingCode.value = true
  try {
    const res = await userStore.getCode()
    if (res?.code === 0) {
      Snackbar.success(`${t('forgotPassword.sendCodeSuccess')}: ${res.result}`)
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isGettingCode.value = false
  }
}

async function reset(valid: boolean) {
  if (!valid)
    return

  try {
    loading.value = true
    const res = await userStore.reset()

    if (res?.code === 0) {
      Snackbar.success(t('forgotPassword.passwordResetSuccess'))
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
</script>

<template>
  <var-form :model="formData" validate-trigger="onSubmit" @submit="reset">
    <var-space direction="column" :size="[14, 0]">
      <var-auto-complete
        v-model="formData.email"
        variant="outlined"
        :rules="z.string().email($t('login.emailFormatError'))"
        :options="emailSuggestions"
        :placeholder="$t('forgotPassword.email')"
      />

      <var-input
        v-model="formData.code"
        variant="outlined"
        :rules="z.string().min(1, $t('forgotPassword.pleaseEnterCode'))"
        :placeholder="$t('forgotPassword.code')"
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
        v-model="formData.password"
        type="password"
        variant="outlined"
        :rules="z.string().min(1, $t('forgotPassword.pleaseEnterPassword'))"
        :placeholder="$t('forgotPassword.password')"
      />

      <var-input
        v-model="formData.confirmPassword"
        type="password"
        variant="outlined"
        :rules="[z.string().min(1, $t('forgotPassword.pleaseEnterConfirmPassword')), confirmPasswordRule]"
        :placeholder="$t('forgotPassword.confirmPassword')"
      />

      <var-button
        :loading="loading"
        type="primary"
        native-type="submit"
        block
      >
        {{ $t('forgotPassword.confirm') }}
      </var-button>

      <var-button size="small" type="primary" text block @click="router.push('/login')">
        {{ $t('forgotPassword.backToLogin') }}
      </var-button>
    </var-space>
  </var-form>
</template>

<route lang="json5">
{
  name: 'ForgotPassword',
  meta: {
    i18n: 'menus.forgotPassword',
  },
}
</route>
