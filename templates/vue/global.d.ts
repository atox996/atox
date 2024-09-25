/// <reference types="vite/client" />

declare const __COMMITID__: string;
declare const __BUILDTIME__: string;

declare module "*.vue" {
  import { ComponentOptions } from "vue";

  const component: ReturnType<ComponentOptions>;
  export default componentOptions;
}
