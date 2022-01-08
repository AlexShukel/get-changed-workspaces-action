import { exec } from "@actions/exec";

export const getChangedFilesFromGit = async (ref: string): Promise<string[]> => {
    const result: string[] = [];

    await exec("git", ["fetch", "--depth=1", "--no-tags", "origin", ref]);

    await exec("git", ["diff-index", "--name-only", ref], {
        listeners: {
            stdline: (data) => result.push(data),
        },
    });

    return result;
};
