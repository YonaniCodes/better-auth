import type { BetterAuthClientPlugin } from "../../client/types";  
import type { telegram } from "./index";  
  
export const telegramClient = () => {  
  return {  
    id: "telegram",  
    $InferServerPlugin: {} as ReturnType<typeof telegram>,  
    getActions: ($fetch) => {  
      return {  
        signInWithTelegram: async (options?: {  
          callbackURL?: string;  
        }) => {  
          // This would typically be handled by the Telegram widget  
          // The widget redirects to your callback endpoint automatically  
          return {  
            data: {  
              url: `/api/auth/telegram/callback`,  
              redirect: true,  
            },  
            error: null,  
          };  
        },  
      };  
    },  
  } satisfies BetterAuthClientPlugin;  
};