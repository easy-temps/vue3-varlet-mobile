<script setup lang="ts">
definePage({
  name: 'unocss',
  meta: {
    level: 2,
    title: '🎨 Unocss 示例',
    i18n: 'home.unocssExample',
  },
})
</script>

<template>
  <Container>
    <h1 class="text-6xl color-pink font-semibold">
      Hello, Unocss!
    </h1>

    <p class="mt-4 text-[var(--color-primary)] dark:text-white">
      This is a simple example of Unocss.
    </p>
  </Container>
</template>
