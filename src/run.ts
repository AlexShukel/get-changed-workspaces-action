import path from "path";

import { getInput, setFailed, setOutput } from "@actions/core";
import minimatch from "minimatch";

import { getChangedFiles } from "./getChangedFiles";
import { getRootDirectory } from "./getRootDirectory";
import { getWorkspaces } from "./getWorkspaces";
import { isValidRegex } from "./isValidRegex";

type Package = {
    name: string;
    path: string;
};

export const run = async () => {
    console.log("Running get-changed-workspaces-action");
    const gitRoot = await getRootDirectory();
    const changedFiles = (await getChangedFiles()).map((file) => path.join(gitRoot, file));
    const workspaces = await getWorkspaces();

    const packages: Package[] = [];

    const filter = getInput("filter");

    if (!isValidRegex(filter)) {
        setFailed("Filter option is not valid regex.");
    }

    const filterRegex = new RegExp(filter);

    workspaces.forEach((workspacePath, name) => {
        if (
            filterRegex.test(name) &&
            minimatch.match(changedFiles, path.join(workspacePath, "**"), {
                dot: true,
            }).length > 0
        ) {
            packages.push({ name, path: workspacePath });
        }
    });

    setOutput("packages", packages);
    setOutput("empty", packages.length === 0);
};
