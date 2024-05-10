<script setup lang="ts">
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
      <var-icon name="warning" size="3em" />
      <div> Not found </div>

      <div class="mt-10">
        <button btn m="3 t8" class="px-10 py-6 font-bold" @click="onBack">
          Back
        </button>
      </div>
    </div>
  </Container>
</template>
