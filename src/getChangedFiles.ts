import { context } from "@actions/github";
import { getInput } from "@actions/core";
import { isSameBranch } from "./isSameBranch";
import { getChangedFilesFromGit } from "./getChangedFilesFromGit";
import { NULL_SHA } from "./constants";

export const getChangedFiles = async (): Promise<string[]> => {
    if (context.eventName === "pull_request") {
        return getChangedFilesFromGit(context.payload.pull_request?.base.ref);
    } else if (context.eventName === "push") {
        const { before, ref } = context.payload as { before: string; ref: string };

        if (ref.startsWith("refs/tags/")) {
            return [];
        }

        const inputRef = getInput("base-ref");

        let baseRef = inputRef;

        if (isSameBranch(inputRef, ref)) {
            baseRef = before;
        }

        if (baseRef === NULL_SHA) {
            return [];
        }

        return getChangedFilesFromGit(baseRef);
    } else {
        throw new Error("This action can be triggered only by pull_request or push event");
    }
};
