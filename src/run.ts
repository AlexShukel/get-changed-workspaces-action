import { getInput } from "@actions/core";
import { getChangedFiles } from "./getChangedFiles";
import { getWorkspaces } from "./getWorkspaces";
import { getWorkspacesFromInput } from "./getWorkspacesFromInput";

export const run = async () => {
    const workspaces = getWorkspacesFromInput() || (await getWorkspaces());

    const output: string[] = [];
    const token = getInput("token");

    const changedFiles = await getChangedFiles();
    console.log(workspaces);
    console.log(changedFiles);
};
