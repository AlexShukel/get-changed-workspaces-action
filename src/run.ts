import { getChangedFiles } from "./getChangedFiles";
import { setOutput } from "@actions/core";
import { getWorkspaces } from "./getWorkspaces";

export const run = async () => {
    const output: string[] = [];
    const changedFiles = (await getChangedFiles()).map((val) => process.cwd() + val);
    const workspaces = await getWorkspaces();

    console.log(changedFiles);
    console.log(workspaces);

    setOutput("changed_workspaces", output);
};
