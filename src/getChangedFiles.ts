import { getInput } from "@actions/core";
import { context } from "@actions/github";

import { NULL_SHA } from "./constants";
import { getChangedFilesFromGit } from "./getChangedFilesFromGit";
import { isSameBranch } from "./isSameBranch";

export const getChangedFiles = async (): Promise<string[]> => {
    if (context.eventName === "pull_request") {
        return getChangedFilesFromGit(context.payload.pull_request!.base.ref);
    } else if (context.eventName === "push") {
        const { before, ref } = context.payload as { before: string; ref: string };

        if (ref.startsWith("refs/tags/")) {
            return [];
        }

        const inputRef = getInput("base-ref");

        const baseRef = isSameBranch(inputRef, ref) ? before : inputRef;

        if (baseRef === NULL_SHA) {
            return [];
        }

        return getChangedFilesFromGit(baseRef);
    } else {
        throw new Error("This action can be triggered only by pull_request or push event");
    }
};
