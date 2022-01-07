import { getWorkspacePath } from "../src/getWorkspacePath";

describe("Get path to workspace from glob pattern", () => {
    it("should get workspace path", () => {
        expect(getWorkspacePath("packages/a/utils/index.ts", "packages/**")).toBe("packages/a");
    });
});
