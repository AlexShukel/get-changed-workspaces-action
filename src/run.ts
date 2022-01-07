import { getChangedFiles } from "./getChangedFiles";
import { setOutput } from "@actions/core";
import { getWorkspaces } from "./getWorkspaces";
import minimatch from "minimatch";

export const run = async () => {
    const output: string[] = [];
    const changedFiles = (await getChangedFiles()).map((path) => `${process.cwd()}/${path}`);
    const workspaces = await getWorkspaces();

    workspaces.forEach((workspace) => {
        if (minimatch.match(changedFiles, `${workspace}/**`).length > 0) {
            output.push(workspace);
        }
    });

    setOutput("changed_workspaces", output);
};
