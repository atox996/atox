import type { VNodeTypes } from "vue";

const getRouteName = (route: _RouteRecordBase) =>
  route.name?.toString() || route.path;

// 定义一个类型守卫，用于判断 comp.type 是否为 Vue 组件
function isVueComponentType(type: VNodeTypes): type is Component {
  return typeof type === "object" && ("setup" in type || "render" in type);
}

export const useKeepAlive = (routes: _RouteRecordBase[]) => {
  const keepAliveViews = computed(() =>
    routes
      .filter((route) => route.meta?.keepAlive === true)
      .map((route) => getRouteName(route)),
  );

  const getComponent = (comp: VNode | undefined, route: _RouteRecordBase) => {
    if (!comp) return;
    // 使用类型守卫函数判断
    if (isVueComponentType(comp.type) && typeof comp.type !== "function") {
      comp.type.name = getRouteName(route); // 动态修改组件的 name
    }
    return comp;
  };

  return {
    keepAliveViews,
    getComponent,
  };
};
