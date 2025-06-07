import { APIError } from "better-call";
import crypto from "crypto";

// ✅ Hash verification
export function verifyHash(body: any, botToken: string): boolean {
  const { hash, ...data } = body;
  
      if (!hash) {
            throw new APIError("UNAUTHORIZED", {
                message: "Hash not found",
              });
          }
        // --- 1. Verify Telegram Hash ---
          const dataCheckArr: string[] = [];
          Object.keys(body)
            .filter((key) => key !== "hash")
            .sort()
            .forEach((key) => {
              dataCheckArr.push(`${key}=${body[key]}`);
            });
          const dataCheckString = dataCheckArr.join("\n");
          // console.log("datacheckstring", dataCheckString);
          // console.log("bottokeb",botToken)

          const secretKey = crypto
            .createHash("sha256")
            .update(botToken)
            .digest();
          const calculatedHash = crypto
            .createHmac("sha256", secretKey)
            .update(dataCheckString)
            .digest("hex")

            // console.log(calculatedHash,"......" ,hash,"...", calculatedHash === hash)
            return calculatedHash === hash;
}



export function isAuthDateValid(authDateStr: string, maxAgeSeconds = 86400): boolean {
  const authDate = parseInt(authDateStr, 10);
  if (isNaN(authDate)) return false;

  const now = Math.floor(Date.now() / 1000);
  return now - authDate <= maxAgeSeconds;
}
