<template>
  <t-layout class="app-layout">
    <t-aside width="auto">
      <side-nav></side-nav>
    </t-aside>
    <t-layout class="main-layout">
      <t-header><Header /></t-header>
      <t-content class="content-wrapper">
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="keepAliveViews">
            <component :is="getComponent(Component, route)" :key="route.path" />
          </keep-alive>
        </router-view>
      </t-content>
    </t-layout>
  </t-layout>
</template>
<script lang="ts" setup>
import { useKeepAlive } from "@/hooks/useKeepAlive";

const router = useRouter();
const routes = router.getRoutes();

const { keepAliveViews, getComponent } = useKeepAlive(routes);
</script>
<style lang="less" scoped>
.app-layout {
  width: 100%;
  height: 100%;

  .main-layout {
    overflow: hidden;

    .content-wrapper {
      overflow: hidden;
    }
  }
}
</style>
