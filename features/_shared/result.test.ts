import { describe, expect, it } from "vitest";
import { ok, err, isOk, isErr, map } from "./result";

describe("Result", () => {
  it("creates ok values", () => {
    const r = ok(5);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(5);
  });

  it("creates err values", () => {
    const r = err("boom");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("boom");
  });

  it("isOk and isErr narrow correctly", () => {
    const good = ok("a");
    const bad = err("b");
    expect(isOk(good)).toBe(true);
    expect(isErr(good)).toBe(false);
    expect(isOk(bad)).toBe(false);
    expect(isErr(bad)).toBe(true);
  });

  it("map transforms ok values, passes through err", () => {
    expect(map(ok(2), (n) => n * 3)).toEqual({ ok: true, value: 6 });
    expect(map(err("nope"), (n: number) => n * 3)).toEqual({ ok: false, error: "nope" });
  });
});
