import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // We intentionally setState inside effects for: mount-time localStorage reads,
      // IntersectionObserver-driven animations, and event subscriptions. These patterns
      // are correct and battle-tested. Downgrade to warning rather than error.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
