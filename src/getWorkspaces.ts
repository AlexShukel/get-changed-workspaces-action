import { getInput } from "@actions/core";
import mapWorkspaces from "@npmcli/map-workspaces";
import fs from "fs";

export const getWorkspaces = async (): Promise<Map<string, string>> => {
    const configSource = await fs.promises.readFile("package.json", { encoding: "utf-8" });
    const parsedConfig = JSON.parse(configSource);
    const workspaces = getInput("workspaces");

    if (workspaces) {
        const workspacesArray = workspaces.split("\n").map((val) => val.trim());

        if (!parsedConfig.workspaces || Array.isArray(parsedConfig.workspaces)) {
            parsedConfig.workspaces = workspacesArray;
        } else {
            parsedConfig.workspaces.packages = workspacesArray;
        }
    }

    const workspacesMap = await mapWorkspaces({
        pkg: parsedConfig,
        cwd: process.cwd(),
    });

    return workspacesMap;
};
