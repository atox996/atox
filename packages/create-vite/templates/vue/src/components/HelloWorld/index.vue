<template>
  <h1>{{ msg }}</h1>

  <button type="button" @click="count++">count is {{ count }}</button>

  <p>
    Check out
    <a href="https://www.npmjs.com/package/@atox/create-vite" target="_blank"
      >@atox/create-vite</a
    >, Vite template starter
  </p>
</template>
<script lang="ts" setup>
defineProps<{ msg: string }>();

const count = ref(0);
</script>
