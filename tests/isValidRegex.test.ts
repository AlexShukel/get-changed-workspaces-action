import { isValidRegex } from "../src/isValidRegex";

describe("is valid regex", () => {
    it("should return false for not valid regex", () => {
        expect(isValidRegex("[")).toBe(false);
    });

    it("should return true for valid regex", () => {
        expect(isValidRegex("[A-Z]")).toBe(true);
    });
});
