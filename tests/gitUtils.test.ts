import { isSameBranch } from "../src/gitUtils";

describe("Git utils", () => {
    test("isSameBranch", () => {
        expect(isSameBranch("refs/heads/test", "refs/test")).toBe(true);
    });
});
