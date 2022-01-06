import { exec } from "@actions/exec";
import { context } from "@actions/github";

export const getChangedFiles = async (): Promise<string[]> => {
    const result: string[] = [];

    await exec("git", ["fetch", "--all"]);

    await exec("git", ["diff", "--name-only", `origin/${context.payload.pull_request?.base.ref}`], {
        listeners: {
            stdline: (data) => console.log("print: ", data),
        },
    });

    return result;
};
