<template>
  <t-layout class="app-layout">
    <t-aside width="auto">
      <side-nav></side-nav>
    </t-aside>
    <t-layout class="main-layout">
      <t-header><Header /></t-header>
      <t-content>
        <router-view class="page-wrapper"></router-view>
      </t-content>
    </t-layout>
  </t-layout>
</template>
<style lang="less" scoped>
.app-layout {
  width: 100%;
  height: 100%;

  .main-layout {
    overflow: hidden;

    .page-wrapper {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
