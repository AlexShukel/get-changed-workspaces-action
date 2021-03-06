import fs from "fs";
import path from "path";

import { getInput } from "@actions/core";
import mapWorkspaces from "@npmcli/map-workspaces";

export const getWorkspaces = async (): Promise<Map<string, string>> => {
    const packageDirPath = getInput("working-directory") || process.cwd();
    const packageJsonPath = path.join(packageDirPath, "package.json");
    const configSource = await fs.promises.readFile(packageJsonPath, { encoding: "utf-8" });
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
        cwd: packageDirPath,
    });

    return workspacesMap;
};
