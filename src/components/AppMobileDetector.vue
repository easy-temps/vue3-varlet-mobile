<script setup lang="ts">
const isMobile = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
</script>

<template>
  <slot v-if="isMobile" />

  <div v-else class="min-h-screen flex flex-col items-center justify-center px-[14px]">
    <var-result
      class="max-w-[350px] bg-transparent"
      type="warning"
      :title="$t('app.warning')"
      :description="$t('app.pleaseUseMobileVisit')"
    />
  </div>
</template>
