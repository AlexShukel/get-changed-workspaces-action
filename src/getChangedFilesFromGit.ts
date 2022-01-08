import { exec } from "@actions/exec";

export const getChangedFilesFromGit = async (ref: string): Promise<string[]> => {
    const result: string[] = [];

    await exec("git", ["fetch", "--all"]);

    await exec("git", ["pull", "-all"]);

    await exec("git", ["diff", "--name-only", ref], {
        listeners: {
            stdline: (data) => result.push(data),
        },
    });

    return result;
};
