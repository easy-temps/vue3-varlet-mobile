<script setup lang="ts">
defineOptions({
  name: 'Keepalive',
})

definePage({
  name: 'Keepalive',
  meta: {
    level: 2,
    title: '🧡 KeepAlive',
    i18n: 'home.keepAlive',
    keepAlive: true,
  },
})

const value = ref(10)
</script>

<template>
  <Container>
    <p>
      {{ $t('keepAlive.label') }}
    </p>

    <var-counter v-model="value" />
  </Container>
</template>
