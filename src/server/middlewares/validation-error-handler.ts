import type { Context } from "hono";

export const validationErrorHandler = (
  result: { success: boolean },
  context: Context
) => {
  if (!result.success) {
    return context.json({ error: "Bad Request" }, 400);
  }
};
