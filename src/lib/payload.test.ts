import { expect, describe, it } from "vitest";
import { Payload } from "./payload";

describe("payload", () => {
  it("should generate the right parameter for page 354", async () => {
    const realValue =
      "dd1e7dfa1956720d219f4412eda1a961e2ab5e4453839945ba57766f5fee9d45";

    const payload = new Payload(354);
    const generatedValue = await payload.generateParameter();

    expect(generatedValue).toBe(realValue);
  });
  it("should generate the right parameter for page 222", async () => {
    const realValue =
      "29364ee0cbcd7587efa4bf2d814b566c1c4ddc5e17d745cdfcc1d43c95ed8a01";

    const payload = new Payload(222);
    const generatedValue = await payload.generateParameter();

    expect(generatedValue).toBe(realValue);
  });
});
