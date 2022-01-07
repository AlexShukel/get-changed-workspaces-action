import { getChangedFiles } from "./getChangedFiles";
import { setOutput } from "@actions/core";
import { getWorkspaces } from "./getWorkspaces";

export const run = async () => {
    const output: string[] = [];
    const changedFiles = await getChangedFiles();
    const workspaces = await getWorkspaces();

    console.log(workspaces);

    setOutput("changed_workspaces", output);
};
