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

    const names: string[] = [];
    const paths: string[] = [];

    workspaces.forEach((workspace, name) => {
        if (
            minimatch.match(changedFiles, path.join(process.cwd(), workspace, "**"), {
                dot: true,
            }).length > 0
        ) {
            names.push(name);
            paths.push(workspace);
        }
    });

    setOutput("names", names);
    setOutput("paths", paths);
    setOutput("empty", names.length === 0);
};
