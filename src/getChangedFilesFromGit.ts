import { exec } from "@actions/exec";

import { FETCH_HEAD } from "./constants";

export const getChangedFilesFromGit = async (ref: string): Promise<string[]> => {
    const result: string[] = [];

    await exec("git", ["fetch", "--depth=1", "--no-tags", "origin", ref]);

    await exec("git", ["diff", "--name-only", FETCH_HEAD], {
        listeners: {
            stdline: (data) => result.push(data),
        },
    });

    return result;
};
