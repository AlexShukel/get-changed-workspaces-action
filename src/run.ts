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

    const packagesNames: string[] = [];
    const packagesPaths: string[] = [];

    workspaces.forEach((workspace, name) => {
        if (minimatch.match(changedFiles, path.join(process.cwd(), workspace, "**")).length > 0) {
            packagesNames.push(name);
            packagesPaths.push(workspace);
        }
    });

    console.log("Names:", packagesNames);
    console.log("Paths:", packagesPaths);

    setOutput("changed-packages-names", packagesNames);
    setOutput("changed-packages-paths", packagesPaths);
};
