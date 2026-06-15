import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { vercelEdgeAdapter } from "@builder.io/qwik-city/adapters/vercel-edge/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.vercel-edge.tsx", "@qwik-city-plan"],
        external: [
          "fs",
          "path",
          "stream",
          "crypto",
          "os",
          "net",
          "tls",
          "http",
          "https",
          "zlib",
          "events",
          "util",
          "buffer",
        ],
      },
      outDir: ".vercel/output/functions/_qwik-city.func",
    },
    resolve: {
      alias: {
        "jspdf": resolve(__dirname, "../../src/lib/mocks/client-libs-mock.ts"),
        "jszip": resolve(__dirname, "../../src/lib/mocks/client-libs-mock.ts"),
        "opentype.js/dist/opentype.module.js": resolve(__dirname, "../../src/lib/mocks/client-libs-mock.ts"),
      },
    },
    plugins: [
      vercelEdgeAdapter(),
      {
        name: "replace-opentype-fs",
        transform(code, id) {
          if (id.includes("opentype")) {
            return code
              .replace(/require\(['"]fs['"]\)/g, "undefined")
              .replace(/var t=require\(['"]fs['"]\)/g, "var t=undefined");
          }
        },
      },
    ],
  };
});