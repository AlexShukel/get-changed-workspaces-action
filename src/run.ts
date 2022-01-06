import { getInput } from "@actions/core";
import { getChangedFiles } from "./getChangedFiles";
import { getWorkspaces } from "./getWorkspaces";

export const run = async () => {
    const workspaces = getInput("workspaces") || (await getWorkspaces());

    // get array of paths to changed packages
    const output: string[] = [];
    const token = getInput("token");

    await getChangedFiles();
};
