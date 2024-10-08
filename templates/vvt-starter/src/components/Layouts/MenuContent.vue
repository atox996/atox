<template>
  <template v-for="item in menuList" :key="item.path">
    <t-menu-item
      v-if="!item.children?.length"
      :name="item.name || item.path"
      :value="item.path"
      :to="{ path: item.path }"
    >
      <template #icon>
        <template v-if="item.meta?.icon">
          <t-icon
            v-if="typeof item.meta.icon === 'string'"
            :name="item.meta.icon"
          ></t-icon>
          <component :is="item.meta.icon" v-else></component>
        </template>
      </template>
      {{ item.meta?.title }}
    </t-menu-item>
    <t-submenu
      v-else
      :name="item.name || item.path"
      :value="item.path"
      :title="item.meta?.title"
    >
      <template #icon>
        <template v-if="item.meta?.icon">
          <t-icon
            v-if="typeof item.meta.icon === 'string'"
            :name="item.meta.icon"
          ></t-icon>
          <component :is="item.meta.icon" v-else></component>
        </template>
      </template>
      <menu-content
        v-if="item.children"
        :nav-data="item.children"
      ></menu-content>
    </t-submenu>
  </template>
</template>
<script lang="ts" setup>
const props = defineProps<{
  navData: readonly _RouteRecordBase[];
}>();

const getMenuList = <T extends _RouteRecordBase>(list: readonly T[]): T[] => {
  return list
    .filter((item) => item.meta?.hidden !== true)
    .map((item) => {
      if (item.children?.length) item.children = getMenuList(item.children);
      if (item.meta?.single === true) return item.children![0] as T;
      return item;
    })
    .filter(Boolean);
};

const menuList = computed(() => getMenuList(props.navData));
</script>
