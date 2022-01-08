import { exec } from "@actions/exec";
import { context } from "@actions/github";
import { getInput } from "@actions/core";
import { isSameBranch } from "./gitUtils";

export const getChangedFiles = async (): Promise<string[]> => {
    if (context.eventName === "pull_request") {
        const result: string[] = [];

        await exec("git", ["fetch", "--all"]);

        await exec("git", ["diff", "--name-only", `origin/${context.payload.pull_request?.base.ref}`], {
            listeners: {
                stdline: (data) => result.push(data),
            },
        });

        return result;
    } else if (context.eventName === "push") {
        const { before, ref } = context.payload;
        const inputRef = getInput("base-ref");

        let baseRef = inputRef;

        if (isSameBranch(inputRef, ref)) {
            baseRef = before;
        }

        console.log(baseRef);

        return [];
    } else {
        throw new Error("This action can be triggered only by pull_request or push event");
    }
};
