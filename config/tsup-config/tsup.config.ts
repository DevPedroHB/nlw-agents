import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/**/*.ts", "./src/**/*.tsx", "!./src/**/*spec.ts"],
	splitting: false,
	sourcemap: true,
	clean: true,
	dts: true,
	format: ["cjs", "esm"],
	noExternal: [
		// config
		"@nlw-agents/typescript-config",
		"@nlw-agents/tsup-config",
		// packages
		"@nlw-agents/db",
		"@nlw-agents/env",
	],
	outDir: "dist",
	tsconfig: "./tsconfig.json",
});
