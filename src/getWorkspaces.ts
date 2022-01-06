import fs from "fs";

export const getWorkspaces = async (): Promise<string[]> => {
    const configSource = await fs.promises.readFile("package.json", { encoding: "utf-8" });
    const config = JSON.parse(configSource);

    if (typeof config.workspaces !== "object" || config.workspaces === null) {
        return [];
    }

    if (Array.isArray(config.workspaces)) {
        return config.workspaces;
    }

    if (Array.isArray(config.workspaces.packages)) {
        return config.workspaces.packages;
    }

    return [];
};
