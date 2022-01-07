import { getChangedFiles } from "./getChangedFiles";
import { getWorkspaces } from "./getWorkspaces";
import { getWorkspacesFromInput } from "./getWorkspacesFromInput";
import { getChangedWorkspace } from "./getChangedWorkspace";
import { setOutput } from "@actions/core";
import mapWorkspaces from "@npmcli/map-workspaces";
import fs from "fs";

export const run = async () => {
    // const workspaces = getWorkspacesFromInput() || (await getWorkspaces());

    // const output: string[] = [];

    // const changedFiles = await getChangedFiles();

    const configSource = await fs.promises.readFile("package.json", { encoding: "utf-8" });
    console.log(await mapWorkspaces({ pkg: JSON.parse(configSource), cwd: process.cwd() }));

    // changedFiles.forEach((file) => {
    //     workspaces.forEach((workspace) => {
    //         const changedWorkspace = getChangedWorkspace(file, workspace);
    //         if (changedWorkspace) {
    //             output.push(changedWorkspace);
    //         }
    //     });
    // });

    setOutput("changed_workspaces", []);
};
