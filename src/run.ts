import path from "path";

import { getInput, setFailed, setOutput } from "@actions/core";
import minimatch from "minimatch";

import { getChangedFiles } from "./getChangedFiles";
import { getRootDirectory } from "./getRootDirectory";
import { getWorkspaces } from "./getWorkspaces";
import { isValidRegex } from "./isValidRegex";

export const run = async () => {
    console.log("Running get-changed-workspaces-action");
    const gitRoot = await getRootDirectory();
    const changedFiles = (await getChangedFiles()).map((file) => path.join(gitRoot, file));
    const workspaces = await getWorkspaces();

    console.log(workspaces);

    const names: string[] = [];
    const paths: string[] = [];

    const filter = getInput("filter");

    if (!isValidRegex(filter)) {
        setFailed("Filter option is not valid regex.");
    }

    const filterRegex = new RegExp(filter);

    workspaces.forEach(([workspacePath, name]) => {
        console.log(name, filterRegex.test(name));

        if (
            filterRegex.test(name) &&
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
