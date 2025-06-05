// packages/better-auth/src/plugins/telegram/index.ts  
import { createAuthEndpoint } from "../../api/call";
import { createHMAC } from "@better-auth/utils/hmac";  
import { createHash } from "@better-auth/utils/hash";  
import { APIError } from "better-call";
import { setSessionCookie } from "../../cookies";  
import { handleOAuthUserInfo } from "../../oauth2/link-account";
import type { BetterAuthPlugin } from "../../types/plugins";  
import { z } from "zod";  
  
interface TelegramOptions {  
  botToken: string;  
  botUsername: string;  
  /**  
   * Maximum age of auth data in seconds  
   * @default 86400 (24 hours)  
   */  
  maxAge?: number;  
  /**  
   * Disable sign up if user is not found  
   * @default false  
   */  
  disableSignUp?: boolean;  
}  
  
const ERROR_CODES = {  
  INVALID_TELEGRAM_DATA: "Invalid Telegram data",  
  OUTDATED_DATA: "Telegram data is outdated",  
  SIGNATURE_VERIFICATION_FAILED: "Signature verification failed",  
} as const;  
  
export const telegram = (options: TelegramOptions) => {  
  const maxAge = options.maxAge || 86400; // 24 hours  
  async function verifyTelegramData(authData: Record<string, string>) {
  const { hash, ...dataToCheck } = authData;

  if (!hash) {
    throw new APIError("BAD_REQUEST", {
      message: ERROR_CODES.INVALID_TELEGRAM_DATA,
    });
  }

  const dataCheckString = Object.entries(dataToCheck)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  // 🔐 Step 1: Derive raw secret key from bot token
  const secretKeyRaw = await createHash("SHA-256").digest(options.botToken);

  // 🔐 Step 2: Create HMAC utility with SHA-256 and hex encoding
  const hmac = createHMAC("SHA-256", "hex");

  // 🔐 Step 3: Import raw key into CryptoKey object for verification
  const hmacKey = await hmac.importKey(secretKeyRaw, "verify");

  // 🔐 Step 4: Verify the HMAC
  const isValid = await hmac.verify(hmacKey, dataCheckString, hash);

  if (!isValid) {
    throw new APIError("UNAUTHORIZED", {
      message: ERROR_CODES.SIGNATURE_VERIFICATION_FAILED,
    });
  }

  const authDate = parseInt(authData.auth_date);
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime - authDate > maxAge) {
    throw new APIError("BAD_REQUEST", {
      message: ERROR_CODES.OUTDATED_DATA,
    });
  }

  return authData;
}


   
  return {  
    id: "telegram",  
    endpoints: {  
      telegramCallback: createAuthEndpoint(  
        "/telegram/callback",  
        {  
          method: "GET",  
          query: z.object({  
            id: z.string(),  
            first_name: z.string(),  
            last_name: z.string().optional(),  
            username: z.string().optional(),  
            photo_url: z.string().optional(),  
            auth_date: z.string(),  
            hash: z.string(),  
          }),  
          metadata: {  
            openapi: {  
              description: "Telegram Login Widget callback",  
              responses: {  
                302: {  
                  description: "Redirect to callback URL",  
                },  
              },  
            },  
          },  
        },  
        async (ctx) => {  
          try {  
            // Verify Telegram data  
            const verifiedData = await verifyTelegramData(ctx.query);  
              
            // Map Telegram user data to better-auth format  
            const userInfo = {  
              id: verifiedData.id,  
              name: verifiedData.last_name   
                ? `${verifiedData.first_name} ${verifiedData.last_name}`  
                : verifiedData.first_name,  
              email: verifiedData.username 
  ? `${verifiedData.username}@telegram.user` 
  : `${verifiedData.id}@telegram.user`,

              image: verifiedData.photo_url,  
              emailVerified: false, // Telegram doesn't provide email verification  
            };  
  
            // Handle user authentication/registration  
            const result = await handleOAuthUserInfo(ctx, {  
              userInfo,  
              account: {  
                providerId: "telegram",  
                accountId: verifiedData.id,  
                // accessToken: "", // Telegram doesn't provide tokens  
                // refreshToken: "",  
                // expiresAt: null,  
                scope: "",  
              },  
              disableSignUp: options.disableSignUp || false,  
            });  
  
            if (result.error) {  
              const errorURL = ctx.context.options.onAPIError?.errorURL ||   
                `${ctx.context.baseURL}/error`;  
              throw ctx.redirect(`${errorURL}?error=${result.error}`);  
            }  
  
            const { session, user } = result.data!;  
              
            // Set session cookie  
            await setSessionCookie(ctx, {  
              session,  
              user,  
            });  
  
            // Redirect to success URL  
            // const callbackURL = ctx.query.callback_url || "/";  
            // throw ctx.redirect(callbackURL);  
              
          } catch (error) {  
            if (error instanceof APIError) {  
              const errorURL = ctx.context.options.onAPIError?.errorURL ||   
                `${ctx.context.baseURL}/error`;  
              throw ctx.redirect(`${errorURL}?error=${error.message}`);  
            }  
            throw error;  
          }  
        }  
      ),  
    },  
    $ERROR_CODES: ERROR_CODES,  
  } satisfies BetterAuthPlugin;  
};