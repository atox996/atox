<template>
  <section class="page-wrapper">
    <t-space size="20px">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
      <a href="https://tdesign.tencent.com/vue-next/" target="_blank">
        <img
          src="@/assets/tdesign.svg"
          class="logo tdesign"
          alt="TDesign logo"
        />
      </a>
    </t-space>
    <h1>Vite + Vue + TDesign</h1>

    <t-button @click="count++">count is {{ count }}</t-button>

    <p>
      Check out
      <a href="https://www.npmjs.com/package/@atox/create-vite" target="_blank"
        >@atox/create-vite</a
      >, Vite template starter
    </p>
  </section>
</template>
<script lang="ts" setup>
const count = ref(0);
</script>
<style lang="less" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;

    &:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    &.vue:hover {
      filter: drop-shadow(0 0 2em #42b883aa);
    }
    &.tdesign:hover {
      filter: drop-shadow(0 0 2em #009effaa);
    }
  }
  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;

    &:hover {
      color: #747bff;
    }
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }
}
</style>
