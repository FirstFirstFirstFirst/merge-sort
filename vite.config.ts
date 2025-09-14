import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      reporter: ["text", "html", "clover"],
      exclude: [
        "node_modules/",

        "**/*.config.*",

        "tests/**",

        "vitest.config.*",
        "tsconfig.json",
        "package.json",
      ],
    },
  },
});
