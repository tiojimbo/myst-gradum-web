import { describe, it, expect, vi } from "vitest";
import { setTokens } from "./tokens";
describe("Cookie da sessão", () => {
  it("não define vencimento automático", () => {
    const setter = vi.spyOn(document, "cookie", "set");
    setTokens({ accessToken: "token" } as Parameters<typeof setTokens>[0]);
    expect(setter.mock.calls.at(-1)?.[0]).not.toMatch(/max-age|expires/i);
    setter.mockRestore();
  });
});
