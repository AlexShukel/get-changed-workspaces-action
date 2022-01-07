import { getInput } from "@actions/core";
import { getChangedFiles } from "./getChangedFiles";
import { getWorkspaces } from "./getWorkspaces";
import { getWorkspacesFromInput } from "./getWorkspacesFromInput";
import { isMatches } from "./isMatches";

export const run = async () => {
    const workspaces = getWorkspacesFromInput() || (await getWorkspaces());

    const output: string[] = [];
    const token = getInput("token");

    const changedFiles = await getChangedFiles();

    changedFiles.forEach((file) => {
        workspaces.forEach((pattern) => {
            if (isMatches(file, pattern)) {
                output.push(file);
            }
        });
    });

    console.log(output);
};
