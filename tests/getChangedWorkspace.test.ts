import { getChangedWorkspace } from "../src/getChangedWorkspace";

describe("Test pattern matching", () => {
    it("should match by glob pattern", () => {
        expect(getChangedWorkspace("packages/a/index.ts", "packages/**")).toBe("packages/a");
    });

    it("should match by path", () => {
        expect(getChangedWorkspace("packages/a/utils/index.ts", "packages/a")).toBe("packages/a");
    });
});
