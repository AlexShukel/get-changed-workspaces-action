import { isMatches } from "../src/isMatches";

describe("Test pattern matching", () => {
    it("should match by glob pattern", () => {
        expect(isMatches("packages/a/index.ts", "packages/**")).toBe(true);
    });

    it("should match by path", () => {
        expect(isMatches("packages/a/utils/index.ts", "packages/a"));
    });

    // TODO test back slashes (\\)
});
