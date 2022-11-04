import path from "path";

import { getInput, setOutput } from "@actions/core";
import minimatch, { filter } from "minimatch";

import { getChangedFiles } from "./getChangedFiles";
import { getRootDirectory } from "./getRootDirectory";
import { getWorkspaces } from "./getWorkspaces";

export const run = async () => {
    console.log("Running get-changed-workspaces-action");
    const gitRoot = await getRootDirectory();
    const changedFiles = (await getChangedFiles()).map((file) => path.join(gitRoot, file));
    const workspaces = await getWorkspaces();

    const names: string[] = [];
    const paths: string[] = [];

    const filterRegex = getInput("filter");
    Array.from(workspaces)
        .filter(([workspacePath]) => workspacePath.match(filterRegex))
        .forEach(([workspacePath, name]) => {
            if (
                minimatch.match(changedFiles, path.join(workspacePath, "**"), {
                    dot: true,
                }).length > 0
            ) {
                names.push(name);
                paths.push(workspacePath);
            }
        });

    setOutput("names", names);
    setOutput("paths", paths);
    setOutput("empty", names.length === 0);
};
