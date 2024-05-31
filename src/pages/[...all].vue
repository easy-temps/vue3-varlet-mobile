<script setup lang="ts">
definePage({
  meta: {
    level: 2,
  },
})

const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
}
</script>

<template>
  <Container>
    <div text="center gray-300 dark:gray-200 18">
      <var-icon name="warning" size="5em" />
      <div> {{ $t('app.notFound') }} </div>

      <var-button type="primary" class="mt-10" @click="onBack">
        {{ $t('app.backBtn') }}
      </var-button>
    </div>
  </Container>
</template>
