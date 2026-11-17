import { defineConfig } from "drizzle-kit";

export const drizzelConnection = defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
});
