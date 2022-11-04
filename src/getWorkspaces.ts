import fs from "fs";
import path from "path";

import { getInput } from "@actions/core";
import mapWorkspaces from "@npmcli/map-workspaces";
import { parse } from "yaml";

const getPackageConfig = async (packageDirPath: string) => {
    const packageJsonPath = path.join(packageDirPath, "package.json");
    const configSource = await fs.promises.readFile(packageJsonPath, { encoding: "utf-8" });
    const parsedConfig = JSON.parse(configSource);

    if (!parsedConfig.workspaces) {
        const pnpmWorkspacesPath = path.join(packageDirPath, "pnpm-workspace.yaml");

        if (fs.existsSync(pnpmWorkspacesPath)) {
            const file = await fs.promises.readFile(pnpmWorkspacesPath);
            const pnpmWorkspacesConfig = parse(file.toString());

            console.log("parsed pnpm-workspace.yaml:", pnpmWorkspacesConfig);

            parsedConfig.workspaces = pnpmWorkspacesConfig;

            console.log("Parsed config:", parsedConfig);
        }
    }

    return parsedConfig;
};

export const getWorkspaces = async (): Promise<Map<string, string>> => {
    const packageDirPath = getInput("working-directory") || process.cwd();
    const workspaces = getInput("workspaces");
    const parsedConfig = await getPackageConfig(packageDirPath);

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
