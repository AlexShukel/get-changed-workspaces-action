import { getInput } from "@actions/core";
import { getWorkspaces } from "./getWorkspaces";
import { exec } from "@actions/exec";
import { context } from "@actions/github";

export const run = async () => {
    const workspaces = getInput("workspaces") || (await getWorkspaces());

    // get array of paths to changed packages
    const output: string[] = [];
    const token = getInput("token");

    await exec("git", ["fetch", "--all"]);

    await exec("git", ["diff", "--name-only", `origin/${context.payload.pull_request?.base.ref}`], {
        listeners: {
            stdout: (data) => console.log(data.toString()),
        },
    });
};
