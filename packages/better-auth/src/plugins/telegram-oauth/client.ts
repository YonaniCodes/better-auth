import type { telegramOAuth } from "./index";
import type { BetterAuthClientPlugin } from "../../client/types";

export const telegramAuthClient = () => {
  return {
    id: "telegram",
    $InferServerPlugin: {} as ReturnType<typeof telegramOAuth>,
  } satisfies BetterAuthClientPlugin;
};
