import { getInput } from "@actions/core";
import { getWorkspaces } from "./getWorkspaces";
import { exec } from "@actions/exec";

const getChangedFiles = async (ref: string) => {
    let buffer = "";

    const code = await exec("git", ["diff-index", "--name-only", ref], {
        listeners: {
            stdout: (data) => (buffer += data.toString() + " "),
        },
    });

    console.log(buffer, code);
};

export const run = async () => {
    const workspaces = getInput("workspaces") || (await getWorkspaces());

    // get array of paths to changed packages
    const output: string[] = [];
    const token = getInput("token");

    console.log(token, workspaces);
    getChangedFiles("FETCH_HEAD");
};
