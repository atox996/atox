import { build } from "unbuild";

async function main() {
  await build("./", false, {
    entries: ["src/index.ts"],
    outDir: "dist",
    rollup: {
      inlineDependencies: true,
      esbuild: {
        target: "node18",
        minify: true,
      },
    },
    alias: {
      // we can always use non-transpiled code since we support node 18+
      prompts: "prompts/lib/index.js",
    },
  });
}

main().catch(console.error);
