import { isSameBranch } from "../src/isSameBranch";

describe("isSameBranch", () => {
    it("should detect same branch", () => {
        expect(isSameBranch("refs/heads/test", "refs/test")).toBe(true);
    });

    it("should distinct 2 branches", () => {
        expect(isSameBranch("refs/heads/test", "refs/heads/master")).toBe(false);
    });

    it("should distinct commit SHA and branch name", () => {
        expect(isSameBranch("refs/heads/test", "39c1426141ce95238ae955007814819945ea0288")).toBe(false);
    });
});
