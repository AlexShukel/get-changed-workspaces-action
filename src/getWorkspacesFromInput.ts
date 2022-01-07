import { getInput } from "@actions/core";

export const getWorkspacesFromInput = (): null | string[] => {
    const input = getInput("workspaces");

    if (!input) return null;

    try {
        const parsedInput = JSON.parse(input);

        if (parsedInput instanceof Array && parsedInput.every((value) => typeof value === "string")) {
            return parsedInput;
        }

        return null;
    } catch {
        return null;
    }
};
