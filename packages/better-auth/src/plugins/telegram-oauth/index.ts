import { z } from "zod";
import { APIError, createAuthEndpoint } from "../../api";
import { setSessionCookie } from "../../cookies";
import type { BetterAuthPlugin } from "../../types";
import { fakeTelegramEmail, isAuthDateValid, verifyHash } from "./helpers";

interface TelegramOptions {
  disableSignup?: boolean;
  botToken: string;

  // default 24 hours It wont verify after 24 hours
  expiresIn?: number
}



export const telegramOAuth = (options: TelegramOptions) =>
  ({
    id: "telegram",
    endpoints: {
      telegramCallback: createAuthEndpoint(
        "/telegram/callback",
        {
          method: "POST",
          body: z.object({
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
              summary: "Telegram auth callback",
              description: "Authenticate using Telegram OAuth",
              responses: {
                200: {
                  description: "Successful response",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          token: { type: "string" },
                          user: {
                            $ref: "#/components/schemas/User",
                          },
                        },
                      },
                    },
                  },
                },
                400: {
                  description: "Invalid request",
                },
              },
            },
          },
        },
        async (ctx) => {
          const {
            id,
            first_name,
            last_name,
            photo_url,
            hash,
            auth_date,
            ...rest
          } = ctx.body;


          const {botToken,expiresIn}= options

          const telegramId = id;
          const name = `${first_name}${last_name ? " " + last_name : ""}`;
          const image = photo_url;
          const email= fakeTelegramEmail(telegramId)
         

          if (!isAuthDateValid(auth_date,expiresIn))
             throw new APIError("UNAUTHORIZED", {
              message: "Auth data is too old. Rejecting login",
            });


          if (!verifyHash(ctx.body,botToken)) 
            throw new APIError("UNAUTHORIZED", {
              message: "Invalid Telegram signature",
            });
          

      	let existingAccount = await ctx.context.internalAdapter.findAccount(telegramId);

        
          // if there user is logged in before
          let userId:string|null = null;
 
          if (existingAccount) {
            userId= existingAccount.userId
            console.log("user found")
          }
          else{
          //  create user
          const newUser = await ctx.context.internalAdapter.createUser({
            name,
            email,
            emailVerified: false,
            image
          })

          userId= newUser.id
          // create account and link it to usee
          await ctx.context.internalAdapter.createAccount({
             userId: userId,
                  providerId: "telegram",
                  accountId: telegramId,
          })
          }


          const session = await ctx.context.internalAdapter.createSession(userId, ctx);

          //here it's gurantted there is use with userID

          const user= await ctx.context.internalAdapter.findUserById(userId)!

          if(!user)
            throw new APIError("NOT_FOUND", {
          message: "User not found",
          })

         
          await setSessionCookie(ctx, {
          user,
            session,
          });

          console.log(session, user)
          return ctx.json({
            token: session.token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              emailVerified: user.emailVerified,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
          });
        }
      ),
    },
  }) satisfies BetterAuthPlugin;
