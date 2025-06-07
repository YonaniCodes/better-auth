import { describe, expect, it, vi } from "vitest";
import { getTestInstance } from "../../test-utils/test-instance";
import { telegramOAuth } from ".";
import { APIError } from "better-call";
import { telegramAuthClient } from "./client";


 const botToken="7547670619:AAFJDP1UcSLCNa7tmvlNGsFlSLrj63VYX0w"

describe("Telegram auth verification", async () => {
  const { auth, signInWithTestUser, client } = await getTestInstance({
    plugins: [telegramOAuth({
			botToken
		})],
  });

  it("should work", async () => {
    const session = await auth.api.telegramCallback({
      body: {
        auth_date: "1749286830",
        first_name: "Yonani",
        hash: "a7830bd4bc01e5a5683db678b057ac3ca8894ac90d2ccb79bbc82180760ffa6e",
        id: "721748418",
        photo_url: "https://t.me/i/userpic/320/daW5iEUvrsR4-JeBsGIH44UtgSiS_50Kxv5U6eBtpY8.jpg",
        username: "YonaYonani",
      },
    });

    expect(session).toBeDefined();
  });

  it("should fail with incorrect hash", async () => {
    const shouldFail = await auth.api.telegramCallback({
      body: {
        auth_date: "1749286830",
        first_name: "Yonani",
        hash: "a7830bd4bc01e5a5683db678b057ac3ca8894ac90d2ccb79bbc82180760f", // invalid hash
        id: "721748418",
        photo_url: "https://t.me/i/userpic/320/daW5iEUvrsR4-JeBsGIH44UtgSiS_50Kxv5U6eBtpY8.jpg",
        username: "YonaYonani",
      },
    }).catch((e) => e);

    expect(shouldFail).toBeInstanceOf(APIError);
  });
});
