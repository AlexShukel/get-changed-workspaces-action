import { getInput } from "@actions/core";
import { getWorkspaces } from "./getWorkspaces";

export const run = async () => {
    const workspaces = getInput("workspaces") || (await getWorkspaces());
    console.log(workspaces);
};
