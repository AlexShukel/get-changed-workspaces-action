import fs from "fs";
import path from "path";

import { debug, getInput } from "@actions/core";
import mapWorkspaces from "@npmcli/map-workspaces";
import yaml from "js-yaml";

export const getWorkspaces = async (): Promise<Map<string, string>> => {
    const packageDirPath = getInput("working-directory") || process.cwd();

    const pnpmWorkspacesPath = path.join(packageDirPath, "pnpm-workspace.yaml");
    debug("hello1" + pnpmWorkspacesPath);
    if (fs.existsSync(pnpmWorkspacesPath)) {
        const fileSource = await fs.promises.readFile(pnpmWorkspacesPath, { encoding: "utf-8" });
        const workspaces = yaml.load(fileSource);
        console.log(workspaces);
        debug(JSON.stringify(workspaces));
    }

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
