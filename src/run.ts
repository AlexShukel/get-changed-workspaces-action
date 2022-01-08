import { getChangedFiles } from "./getChangedFiles";
import { setOutput } from "@actions/core";
import { getWorkspaces } from "./getWorkspaces";
import minimatch from "minimatch";
import path from "path";
import { getRootDirectory } from "./getRootDirectory";

export const run = async () => {
    const output: string[] = [];
    const gitRoot = await getRootDirectory();
    const changedFiles = (await getChangedFiles()).map((file) => path.join(gitRoot, file));
    const workspaces = await getWorkspaces();

    console.log(workspaces);

    workspaces.forEach((workspace, name) => {
        if (minimatch.match(changedFiles, `${workspace}/**`).length > 0) {
            output.push(name);
        }
    });

    setOutput("changed_workspaces", output);
};
