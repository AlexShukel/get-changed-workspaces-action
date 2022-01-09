import path from "path";

import { setOutput } from "@actions/core";
import minimatch from "minimatch";

import { getChangedFiles } from "./getChangedFiles";
import { getRootDirectory } from "./getRootDirectory";
import { getWorkspaces } from "./getWorkspaces";

export const run = async () => {
    const gitRoot = await getRootDirectory();
    const changedFiles = (await getChangedFiles()).map((file) => path.join(gitRoot, file));
    const workspaces = await getWorkspaces();

    console.log(changedFiles);
    console.log(workspaces);

    const names: string[] = [];
    const paths: string[] = [];

    workspaces.forEach((workspace, name) => {
        console.log(
            workspace,
            name,
            path.join(process.cwd(), workspace, "**"),
            minimatch.match(changedFiles, path.join(process.cwd(), workspace, "**"))
        );
        if (minimatch.match(changedFiles, path.join(process.cwd(), workspace, "**")).length > 0) {
            names.push(name);
            paths.push(workspace);
        }
    });

    console.log(names);

    setOutput("names", names);
    setOutput("paths", paths);
    setOutput("empty", names.length === 0);
};
